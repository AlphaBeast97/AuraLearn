import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

const LandingPage = async () => {
  const { userId } = await auth();

  // If user is signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="cta-badge mb-8 mx-auto w-fit animate-bounce">
          ✨ Real-time AI Teaching Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-primary relative">
            AuraLearn
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-cta-gold/60 rounded-full"></div>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Transform learning with <span className="font-semibold text-primary">personalized AI companions</span> that adapt to your style and pace through natural voice conversations
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/sign-up" className="btn-primary text-lg px-10 py-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-cta opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link href="/sign-in" className="btn-signin text-lg px-10 py-5 hover:bg-muted/50 transition-all duration-300 transform hover:scale-105">
            Sign In →
          </Link>
        </div>

        {/* Hero Preview Cards */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-4xl p-6 lg:p-8 shadow-lg hover:shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 group">
              <div className="subject-badge mb-4">Mathematics</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3">Alex the Math Tutor</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Master calculus with interactive problem solving sessions</p>
              <div className="mt-4 w-8 h-8 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-4xl p-6 lg:p-8 shadow-lg hover:shadow-xl transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 group">
              <div className="subject-badge mb-4">Science</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3">Nova the Lab Assistant</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Explore physics through virtual experiments and simulations</p>
              <div className="mt-4 w-8 h-8 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-4xl p-6 lg:p-8 shadow-lg hover:shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-105 group">
              <div className="subject-badge mb-4">Languages</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3">Luna the Linguist</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Practice French through natural voice conversations</p>
              <div className="mt-4 w-8 h-8 bg-green-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <div className="cta-badge mb-6 mx-auto w-fit">
            🚀 Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AuraLearn?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of education with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 justify-items-center">
          <div className="companion-card bg-gradient-to-br from-blue-100 to-blue-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm lg:max-w-md xl:max-w-lg group">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-4xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">AI-Powered Learning</h3>
            <p className="text-muted-foreground leading-relaxed lg:text-lg">
              Experience personalized learning with AI companions that adapt to your learning style and pace in real-time.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm lg:text-base">
              Learn more →
            </div>
          </div>

          <div className="companion-card bg-gradient-to-br from-purple-100 to-purple-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm lg:max-w-md xl:max-w-lg group">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-4xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Voice Conversations</h3>
            <p className="text-muted-foreground leading-relaxed lg:text-lg">
              Engage in natural voice conversations with AI tutors across various subjects and topics for immersive learning.
            </p>
            <div className="mt-6 flex items-center text-purple-600 font-semibold text-sm lg:text-base">
              Try it now →
            </div>
          </div>

          <div className="companion-card bg-gradient-to-br from-green-100 to-green-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm lg:max-w-md xl:max-w-lg group">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Smart Analytics</h3>
            <p className="text-muted-foreground leading-relaxed lg:text-lg">
              Monitor your learning journey with detailed analytics, insights, and personalized recommendations.
            </p>
            <div className="mt-6 flex items-center text-green-600 font-semibold text-sm lg:text-base">
              View analytics →
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="bg-gradient-to-r from-primary to-cta rounded-4xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Join Our Growing Community</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Active Learners</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-white/80">AI Companions</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="bg-cta text-white rounded-4xl px-8 py-16 flex flex-col items-center text-center gap-6 w-full max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cta-gold/10 to-cta-gold/5 rounded-4xl"></div>
          <div className="relative z-10 w-full">
            <div className="cta-badge animate-pulse mb-6">
              🎯 Start learning your way.
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners who are already experiencing the future of education with personalized AI companions. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-up" className="btn-primary text-lg px-10 py-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Learning Today
              </Link>
              <div className="text-white/80 text-sm">
                ✨ No credit card required
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-8 bg-white/10 rounded-4xl border border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-cta-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white font-medium mb-3 text-lg">
                &ldquo;AuraLearn revolutionized how I study. The AI companions make learning feel like having a personal tutor available 24/7!&rdquo;
              </p>
              <div className="text-white/80 text-sm">
                — Sarah Chen, Medical Student
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;

