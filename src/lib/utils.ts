import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (
  voice: string,
  style: string,
  companionData?: {
    name?: string;
    subject?: string;
    topic?: string;
    duration?: number;
  }
) => {
  // console.log("🔧 Configuring assistant with voice:", voice, "style:", style);
  // console.log("📚 Companion data:", companionData);

  // Use a simple, working voice configuration
  let voiceId = "sarah"; // Default ElevenLabs voice

  try {
    const selectedVoiceType = voices[style as keyof typeof voices];
    if (selectedVoiceType) {
      voiceId =
        selectedVoiceType[voice as keyof typeof selectedVoiceType] || voiceId;
    }
  } catch (error) {
    console.warn("Voice configuration error, using default:", error);
  }

  // console.log("🎤 Using voice ID:", voiceId);

  // Personalized first message based on companion data
  const firstMessage = companionData?.topic
    ? `Hello! I'm ${
        companionData.name || "your learning companion"
      }. Today we'll be learning about ${companionData.topic}${
        companionData.duration
          ? ` in our ${companionData.duration}-minute session`
          : ""
      }. Are you ready to start?`
    : "Hello! I'm your learning companion. What would you like to learn about today?";

  // Personalized system prompt based on companion data
  const systemContent =
    companionData?.topic && companionData?.subject
      ? `You are ${
          companionData.name || "a helpful learning companion"
        }, an expert tutor specializing in ${companionData.subject}. 
       Your goal is to teach the student about "${
         companionData.topic
       }" in an engaging and educational way${
          companionData.duration
            ? ` within a ${companionData.duration}-minute session`
            : ""
        }.
       
       Guidelines:
       - Focus specifically on teaching about ${companionData.topic}
       ${
         companionData.duration
           ? `- This is a ${companionData.duration}-minute session. Keep track of time and pace accordingly`
           : ""
       }
       ${
         companionData.duration
           ? `- When approaching the ${companionData.duration}-minute mark, provide a summary and naturally conclude the session`
           : ""
       }
       ${
         companionData.duration
           ? `- If the student asks to end early or says "cancel", "stop", "end session", or similar, politely wrap up the lesson`
           : ""
       }
       - Keep your responses short and conversational, as this is a voice conversation
       - Be encouraging and patient with the student
       - Break down complex concepts into simple, understandable parts
       - Ask questions to check understanding
       - Use examples and analogies to make concepts clear
       - Stay focused on the topic of ${
         companionData.topic
       } within the subject of ${companionData.subject}
       ${
         companionData.duration && companionData.duration <= 15
           ? "- Since this is a short session, focus on the most essential concepts and wrap up around 12-13 minutes"
           : ""
       }
       ${
         companionData.duration && companionData.duration >= 45
           ? "- Since you have more time, you can dive deeper into complex topics, but still conclude around 43-45 minutes"
           : ""
       }
       - When you're ready to end the session, say something like "That concludes our session on ${
         companionData.topic
       }. Great work today!" and then say "END_SESSION" to signal the session should end.`
      : "You are a helpful learning companion. Keep your responses short and conversational, as this is a voice conversation. Be encouraging and educational.";

  // Minimal working configuration
  const vapiAssistant: CreateAssistantDTO = {
    name: companionData?.name || "Learning Companion",
    firstMessage: firstMessage,

    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },

    voice: {
      provider: "11labs",
      voiceId: voiceId,
    },

    model: {
      provider: "openai",
      model: "gpt-3.5-turbo", // Use more stable model
      messages: [
        {
          role: "system",
          content: systemContent,
        },
      ],
    },
  };

  // console.log("✅ Assistant configured:", vapiAssistant);
  return vapiAssistant;
};
