'use client'
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/Vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'
import { AddToSessionHistory } from '@/lib/actions/companions.actions'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, name, topic, style, voice, userName, userImage, duration }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
    const [transcriptMessages, setTranscriptMessages] = useState<Array<{
        role: 'user' | 'assistant';
        message: string;
        timestamp: Date;
    }>>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef])

    // Keep scroll at top to show latest messages
    useEffect(() => {
        if (transcriptRef.current) {
            transcriptRef.current.scrollTop = 0;
        }
    }, [transcriptMessages])

    useEffect(() => {
        // set up event listeners here
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
            setPermissionError(null);
            setTranscriptMessages([]); // Clear previous messages

            // Start session timer to automatically end call after duration
            sessionTimerRef.current = setTimeout(() => {
                // console.log(`⏰ Session duration of ${duration} minutes reached, ending call...`);
                vapi.stop();
                setCallStatus(CallStatus.FINISHED);
            }, duration * 60 * 1000); // Convert minutes to milliseconds
        };
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            // Clear the session timer if call ends early
            if (sessionTimerRef.current) {
                clearTimeout(sessionTimerRef.current);
                sessionTimerRef.current = null;
            }

            AddToSessionHistory(companionId)
        };
        const onMessage = (message: unknown) => {
            // console.log('📝 Vapi Message:', message);

            // Handle transcript messages - only process FINAL transcripts to avoid partial messages
            const messageObj = message as {
                type?: string;
                role?: string;
                transcript?: string;
                transcriptType?: string;
            };

            if (messageObj.type === 'transcript' &&
                messageObj.transcript &&
                messageObj.transcriptType === 'final') {

                const transcriptMessage = {
                    role: messageObj.role as 'user' | 'assistant',
                    message: messageObj.transcript,
                    timestamp: new Date()
                };

                setTranscriptMessages(prev => [...prev, transcriptMessage]);

                // Check if AI is signaling to end the session (multiple keyword variations)
                const transcript = messageObj.transcript.toUpperCase();
                const endKeywords = ['END_SESSION', 'END SESSION', 'CONCLUDE SESSION', 'SESSION COMPLETE', 'End session'];
                const shouldEndSession = messageObj.role === 'assistant' &&
                    endKeywords.some(keyword => transcript.includes(keyword));

                if (shouldEndSession) {
                    // console.log('🔚 AI signaled session end, closing call...');

                    // Clear the duration timer since AI is ending naturally
                    if (sessionTimerRef.current) {
                        clearTimeout(sessionTimerRef.current);
                        sessionTimerRef.current = null;
                    }

                    setTimeout(() => {
                        vapi.stop();
                        setCallStatus(CallStatus.FINISHED);
                    }, 3000); // Give 3 seconds for the user to hear the conclusion
                }
            }
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: unknown) => {
            console.error('🚨 Vapi SDK Error Details:', error);
            console.error('🔍 Error Type:', typeof error);
            console.error('🔍 Error Keys:', error ? Object.keys(error as object) : 'none');

            // Handle specific error types
            const errorObj = error as {
                error?: { type?: string };
                errorMsg?: string;
                message?: string;
                action?: string;
                callClientId?: string;
            };

            if (errorObj?.error?.type === 'ejected' || errorObj?.errorMsg?.includes('Meeting has ended')) {
                console.error('❌ Call ejected - possible causes:');
                console.error('   - Invalid or expired API token');
                console.error('   - Assistant configuration issue');
                console.error('   - Vapi service limitation reached');
                setCallStatus(CallStatus.FINISHED);
                setPermissionError('Call was ended by the service. This may be due to an invalid API token or configuration issue.');
            } else if (errorObj?.message?.includes('NotAllowedError') || errorObj?.message?.includes('Permission denied')) {
                setCallStatus(CallStatus.INACTIVE);
                setPermissionError('Microphone permission denied. Please allow microphone access and try again.');
            } else {
                setCallStatus(CallStatus.INACTIVE);
                setPermissionError('An error occurred. Please check the console for details and try again.');
            }
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        // Cleanup event listeners on component unmount
        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);

            // Clean up timer on component unmount
            if (sessionTimerRef.current) {
                clearTimeout(sessionTimerRef.current);
            }
        };
    }, [duration]);

    const requestMicrophonePermission = async (): Promise<boolean> => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            return true;
        } catch (error) {
            console.error('Microphone permission denied:', error);
            setPermissionError('Microphone access is required for voice calls. Please allow microphone access and try again.');
            return false;
        }
    };

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleCall = async () => {
        // Mark that user has interacted with the component
        setHasUserInteracted(true);
        setPermissionError(null);

        // Request microphone permission first
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            return;
        }

        setCallStatus(CallStatus.CONNECTING);

        try {
            const companionData = { name, subject, topic, duration };
            const assistant = configureAssistant(voice, style, companionData);

            // Use the simplified vapi.start method
            vapi.start(assistant);
        } catch (error) {
            console.error('Failed to start call:', error);
            setCallStatus(CallStatus.INACTIVE);
            setPermissionError('Failed to start the call. Please try again.');
        }
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        setPermissionError(null);

        // Clear the session timer when manually ending
        if (sessionTimerRef.current) {
            clearTimeout(sessionTimerRef.current);
            sessionTimerRef.current = null;
        }

        vapi.stop();
    }

    const handleRetry = async () => {
        setPermissionError(null);
        await handleCall();
    }

    return (
        <section className='flex flex-col min-h-[75vh]'>
            <section className='flex gap-8 lg:gap-12 max-lg:flex-col'>
                <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 flex flex-col gap-6 items-center justify-center flex-1 relative overflow-hidden">
                    {/* Companion Avatar Section */}
                    <div className='relative size-[280px] sm:size-[320px] lg:size-[360px] flex items-center justify-center rounded-4xl shadow-xl ring-4 ring-white/50 transition-all duration-300'
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <div
                            className={
                                cn(
                                    'absolute transition-opacity duration-1000 z-10',
                                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                                    callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                )
                            }
                        >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={180}
                                height={180}
                                className='sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px] drop-shadow-lg'
                            />
                        </div>
                        <div className={
                            cn
                                (
                                    'absolute transition-opacity duration-1000 z-20',
                                    callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                                )
                        }
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className='size-[280px] sm:size-[320px] lg:size-[360px]'
                            />
                        </div>

                        {/* Status indicator */}
                        <div className="absolute -top-2 -right-2 z-30">
                            <div className={cn(
                                "w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300",
                                callStatus === CallStatus.ACTIVE && "bg-green-500 animate-pulse",
                                callStatus === CallStatus.CONNECTING && "bg-yellow-500 animate-spin",
                                callStatus === CallStatus.INACTIVE && "bg-gray-400",
                                callStatus === CallStatus.FINISHED && "bg-red-500"
                            )}></div>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="font-bold text-2xl sm:text-3xl leading-tight" style={{ color: getSubjectColor(subject) }}>
                            {name}
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSubjectColor(subject) }}></div>
                            <span className="text-sm font-medium capitalize">
                                {callStatus === CallStatus.ACTIVE && "Speaking..."}
                                {callStatus === CallStatus.CONNECTING && "Connecting..."}
                                {callStatus === CallStatus.INACTIVE && "Ready to start"}
                                {callStatus === CallStatus.FINISHED && "Session ended"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 flex flex-col gap-6 min-w-[300px] lg:min-w-[350px]">
                    {/* User Profile Section */}
                    <div className="flex flex-col items-center gap-4 pb-6 border-b border-border/20">
                        <div className="relative">
                            <Image
                                src={userImage}
                                alt='User Avatar'
                                width={120}
                                height={120}
                                className='rounded-4xl shadow-md ring-4 ring-white/50'
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-xl text-foreground">{userName}</p>
                            <p className="text-sm text-muted-foreground">Learning with AI</p>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="space-y-4">
                        {/* Microphone Control */}
                        <button
                            className={cn(
                                'w-full bg-white border-2 rounded-4xl flex items-center justify-center gap-3 py-4 px-6 transition-all duration-300 shadow-sm hover:shadow-md',
                                callStatus !== CallStatus.ACTIVE ? 'border-border/50 cursor-not-allowed opacity-50' :
                                    isMuted ? 'border-red-300 bg-red-50 hover:bg-red-100' : 'border-green-300 bg-green-50 hover:bg-green-100'
                            )}
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            <Image
                                src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                                alt={isMuted ? 'Unmute' : 'Mute'}
                                width={24}
                                height={24}
                            />
                            <span className="font-medium text-base">
                                {isMuted ? 'Turn on Microphone' : 'Turn off Microphone'}
                            </span>
                        </button>

                        {/* Error Display */}
                        {permissionError && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-4xl text-sm">
                                <p className="font-medium mb-2">{permissionError}</p>
                                {callStatus === CallStatus.FINISHED && (
                                    <button
                                        onClick={handleRetry}
                                        className="text-red-600 underline hover:no-underline font-medium"
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Main Action Button */}
                        <button className={
                            cn(
                                'w-full py-4 px-6 rounded-4xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none',
                                callStatus === CallStatus.ACTIVE ?
                                    'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' :
                                    'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white',
                                callStatus === CallStatus.CONNECTING && 'animate-pulse'
                            )
                        }
                            onClick={
                                callStatus === CallStatus.ACTIVE
                                    ? handleDisconnect
                                    : handleCall
                            }
                            disabled={callStatus === CallStatus.CONNECTING}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {callStatus === CallStatus.ACTIVE && "🔴"}
                                {callStatus === CallStatus.CONNECTING && "⏳"}
                                {callStatus === CallStatus.INACTIVE && "🚀"}
                                {callStatus === CallStatus.FINISHED && "🔄"}
                                {callStatus === CallStatus.ACTIVE
                                    ? 'End Session'
                                    : callStatus === CallStatus.CONNECTING ? 'Connecting...'
                                        : 'Start Session'}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Transcript Section */}
            <section className='mt-8 bg-white rounded-4xl shadow-lg border border-border/50 flex-1 relative overflow-hidden'>
                <div className="p-6 sm:p-8 border-b border-border/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-foreground">Live Transcript</h3>
                            <p className="text-sm text-muted-foreground">Real-time conversation with your AI tutor</p>
                        </div>
                    </div>
                </div>

                <div ref={transcriptRef} className="p-6 sm:p-8 h-96 overflow-y-auto no-scrollbar space-y-4">
                    {transcriptMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center space-y-3">
                                <div className="w-16 h-16 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-muted-foreground font-medium">Conversation transcript will appear here...</p>
                                <p className="text-sm text-muted-foreground">Start a session to begin your learning journey</p>
                            </div>
                        </div>
                    ) : (
                        transcriptMessages.slice().reverse().map((msg, index) => (
                            <div key={transcriptMessages.length - 1 - index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] p-4 rounded-4xl shadow-sm ${msg.role === 'user'
                                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white rounded-br-lg'
                                    : 'bg-muted/50 text-foreground rounded-bl-lg border border-border/30'
                                    }`}>
                                    <div className="flex items-start gap-2 mb-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-white/20 text-white' : 'bg-primary/20 text-primary'
                                            }`}>
                                            {msg.role === 'user' ? 'Y' : 'AI'}
                                        </div>
                                        <span className={`text-xs font-medium ${msg.role === 'user' ? 'text-white/80' : 'text-muted-foreground'
                                            }`}>
                                            {msg.role === 'user' ? 'You' : name}
                                        </span>
                                        <span className={`text-xs ml-auto ${msg.role === 'user' ? 'text-white/60' : 'text-muted-foreground'
                                            }`}>
                                            {msg.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{msg.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Fade overlay for visual effect */}
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none' />
            </section>
        </section >
    )
}

export default CompanionComponent