import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import NavBar from "@/components/NavBar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// src/app/layout.tsx
export const metadata = {
  title: {
    default: "AuraLearn — Real-Time AI Teaching Platform",
    template: "%s | AuraLearn",
  },
  description:
    "Experience the future of education with AuraLearn — create personalized AI learning companions, talk with them in real-time, and learn any subject interactively.",
  keywords: [
    "AuraLearn",
    "AI learning platform",
    "AI tutors",
    "voice learning",
    "Next.js education app",
    "personalized learning",
    "VAPI AI",
    "Clerk auth",
    "Supabase",
  ],
  openGraph: {
    title: "AuraLearn — Real-Time AI Teaching Platform",
    description:
      "Create custom AI tutors, learn through voice conversations, and explore subjects from Math to Coding — all in one intelligent platform.",
    url: "https://aura-learn-six.vercel.app",
    siteName: "AuraLearn",
    type: "website",
    images: [
      {
        url: "/images/logo.png", // put a banner in /public/images/
        width: 1200,
        height: 630,
        alt: "AuraLearn AI Learning Companions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraLearn — Real-Time AI Teaching Platform",
    description:
      "Learn anything, anytime, with personalized AI voice tutors on AuraLearn.",
    images: ["/images/logo.png"],
    creator: "@AlphaBeast97",
  },
  metadataBase: new URL("https://aura-learn-six.vercel.app"),
  alternates: {
    canonical: "https://aura-learn-six.vercel.app",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AuraLearn",
      url: "https://aura-learn-six.vercel.app",
      sameAs: ["https://github.com/AlphaBeast97/AuraLearn"],
      description:
        "AuraLearn is an AI-powered learning platform offering real-time voice tutoring across multiple subjects.",
      logo: "https://aura-learn-six.vercel.app/images/logo.png",
    }),
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{
          variables: {
            colorPrimary: '#fe5933',
          }
        }}>
          <NavBar />
          {children}
        </ClerkProvider>
      </body>
    </html >
  );
}


