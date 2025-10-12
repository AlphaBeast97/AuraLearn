# 🎓 AuraLearn

**Real-time AI Teaching Platform** - Experience the future of education with personalized AI learning companions.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Overview

AuraLearn is a cutting-edge educational platform that leverages AI technology to create personalized learning companions. Students can engage in natural voice conversations with AI tutors across various subjects, making learning interactive, engaging, and accessible.

### 🎯 Key Features

- **🤖 AI-Powered Learning Companions** - Create custom AI tutors with unique personalities and teaching styles
- **🎙️ Voice Conversations** - Natural voice interactions powered by VAPI AI technology
- **📚 Multi-Subject Support** - Comprehensive coverage across Mathematics, Science, Languages, History, Coding, and Economics
- **👤 Personalized Experience** - Tailored learning paths based on individual preferences and progress
- **📊 Smart Analytics** - Track learning progress with detailed insights and recommendations
- **🔒 Secure Authentication** - User management powered by Clerk
- **📱 Responsive Design** - Beautiful, mobile-first UI built with Tailwind CSS

## 🚀 Live Demo

Visit [AuraLearn](https://your-live-demo-url.com) to experience the platform in action.

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Lottie React** - Smooth animations and micro-interactions

### Backend & Services

- **Supabase** - Database and real-time subscriptions
- **Clerk** - Authentication and user management
- **VAPI AI** - Voice AI conversations
- **Sentry** - Error monitoring and performance tracking

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TW Animate CSS** - Extended Tailwind animations

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Supabase** account and project
- **Clerk** account for authentication
- **VAPI** account for AI voice integration

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/AlphaBeast97/AuraLearn.git
   cd aura-learn
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # VAPI AI
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token

   # Sentry (Optional)
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Set up Supabase Database**

   Create the following table in your Supabase project:

   ```sql
   CREATE TABLE companions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     subject TEXT NOT NULL,
     topic TEXT NOT NULL,
     voice TEXT NOT NULL,
     style TEXT NOT NULL,
     duration INTEGER NOT NULL,
     author TEXT NOT NULL,
     bookmarked BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE TABLE session_history (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     companion_id UUID REFERENCES companions(id),
     user_id TEXT NOT NULL,
     duration INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
aura-learn/
├── public/                 # Static assets
│   ├── icons/             # SVG icons
│   ├── images/            # Images and graphics
│   └── readme/            # README assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (auth)/        # Authentication pages
│   │   ├── companions/    # Companion-related pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── my-journey/    # User profile and progress
│   │   └── api/           # API routes
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/ui components
│   │   └── *.tsx         # Custom components
│   ├── constants/         # App constants and configuration
│   ├── lib/              # Utility functions and integrations
│   │   └── actions/      # Server actions
│   └── types/            # TypeScript type definitions
├── components.json        # Shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

AuraLearn uses a comprehensive design system built with Tailwind CSS:

- **Colors**: Custom color palette with semantic naming
- **Typography**: Bricolage Grotesque font for modern aesthetics
- **Border Radius**: Consistent `rounded-4xl` for modern, soft edges
- **Shadows**: Layered shadow system for depth and hierarchy
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Core Features Deep Dive

### AI Companion Creation

Users can create personalized AI tutors by:

- Choosing from 6+ subjects (Math, Science, Languages, etc.)
- Selecting voice characteristics (male/female, casual/formal)
- Defining teaching style and personality
- Setting lesson duration preferences

### Voice Conversation System

- Real-time voice processing via VAPI AI
- Natural language understanding
- Contextual responses based on subject matter
- Session recording and transcription

### Progress Tracking

- Comprehensive learning analytics
- Session history and duration tracking
- Subject-wise progress monitoring
- Personalized recommendations

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AlphaBeast97/AuraLearn)

### Other Platforms

The app can also be deployed on:

- **Netlify** - Static site hosting
- **Railway** - Full-stack deployment
- **Digital Ocean** - App Platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework
- **Vercel** - For hosting and deployment platform
- **Supabase** - For the backend-as-a-service
- **Clerk** - For authentication services
- **VAPI** - For AI voice technology
- **Shadcn** - For the beautiful component library

## 📞 Support

For support, email support@auraelearn.com or join our Discord community.

## 🔗 Links

- [Live Demo](https://your-live-demo-url.com)
- [Documentation](https://docs.auralearn.com)
- [Discord Community](https://discord.gg/auralearn)
- [Twitter](https://twitter.com/auralearn)

---

<p align="center">
  <strong>Built with ❤️ by the AuraLearn Team</strong>
</p>
