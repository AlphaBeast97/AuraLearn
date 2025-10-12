import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Sign Up Form */}
        <div className="flex flex-col items-center lg:order-1">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-foreground mb-2">Join AuraLearn</h1>
              <p className="text-muted-foreground">Start your personalized learning journey</p>
            </div>

            <div className="bg-white rounded-4xl shadow-2xl border border-border/50 p-8 flex items-center justify-center">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full flex justify-center",
                    card: "shadow-none border-none bg-transparent w-full max-w-sm",
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="hidden lg:block lg:order-2">
          <div className="space-y-6">
            <div className="cta-badge w-fit">
              🚀 Start your journey today
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              Transform Your Learning with AI
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of learners using personalized AI companions to master new skills and subjects.
            </p>

            {/* Benefits */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-4xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Instant AI Tutoring</h3>
                  <p className="text-muted-foreground text-sm">Get personalized help 24/7</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-4xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Voice Conversations</h3>
                  <p className="text-muted-foreground text-sm">Learn through natural dialogue</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Track Progress</h3>
                  <p className="text-muted-foreground text-sm">Monitor your learning journey</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="pt-8">
              <div className="bg-gradient-to-r from-white to-muted/30 rounded-4xl p-6 border border-border/50">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-cta-gold fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground font-medium text-sm mb-2">
                  &ldquo;AuraLearn helped me understand complex topics better than any traditional method.&rdquo;
                </p>
                <div className="text-muted-foreground text-xs">
                  — Alex Chen, Computer Science Student
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage