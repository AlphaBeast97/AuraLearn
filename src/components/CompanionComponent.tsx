'use client'
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/Vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'

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
        };
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
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

                // Check if AI is signaling to end the session
                if (messageObj.role === 'assistant' && messageObj.transcript.includes('END_SESSION')) {
                    console.log('🔚 AI signaled session end, closing call...');
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
        };
    }, []);

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
        vapi.stop();
    }

    const handleRetry = async () => {
        setPermissionError(null);
        await handleCall();
    }

    return (
        <section className='flex flex-col h-[70vh]'>
            <section className='flex gap-8 max-sm:flex-col'>
                <div className="companion-section">
                    <div className='companion-avatar'
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <div
                            className={
                                cn(
                                    'absolute transition-opacity duration-1000',
                                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                                    callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                )
                            }
                        >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className='max-sm:w-fit'
                            />
                        </div>
                        <div className={
                            cn
                                (
                                    'absolute transition-opacity duration-1000',
                                    callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                                )
                        }
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className='companion-lottie'
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">
                        {name}
                    </p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image
                            src={userImage}
                            alt='User Avatar'
                            width={130}
                            height={130}
                            className='rounded-lg'
                        />
                        <p className="font-bold text-2xl">{userName}</p>
                    </div>
                    <button
                        className='btn-mic'
                        onClick={toggleMicrophone}
                    >
                        <Image
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt={isMuted ? 'Unmute' : 'Mute'}
                            width={36}
                            height={36}
                        />
                        <p className="max-sm:hidden">
                            {isMuted ? 'Turn on Microphone' : 'Turn off Microphone'}
                        </p>
                    </button>
                    {permissionError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-2">
                            <p>{permissionError}</p>
                            {callStatus === CallStatus.FINISHED && (
                                <button
                                    onClick={handleRetry}
                                    className="mt-2 text-sm underline hover:no-underline"
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    )}
                    <button className={
                        cn(
                            'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                            callStatus === CallStatus.ACTIVE ? 'bg-red-600 hover:bg-red-700' : 'bg-primary',
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
                        {callStatus === CallStatus.ACTIVE
                            ? 'End Session'
                            : callStatus === CallStatus.CONNECTING ? 'Connecting...'
                                : 'Start Session'}
                    </button>
                </div>
            </section>

            <section className='transcript'>
                <div ref={transcriptRef} className="transcript-msg no-scrollbar">
                    {transcriptMessages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <p>Conversation transcript will appear here...</p>
                        </div>
                    ) : (
                        transcriptMessages.slice().reverse().map((msg, index) => (
                            <div key={transcriptMessages.length - 1 - index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                        {msg.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='transcript-fade' />
            </section>
        </section >
    )
}

export default CompanionComponent