import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
  throw new Error(
    "NEXT_PUBLIC_VAPI_WEB_TOKEN environment variable is required"
  );
}

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
