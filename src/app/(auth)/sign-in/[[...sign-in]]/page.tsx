import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div className="cta-badge w-fit">
              ✨ Welcome back to AuraLearn
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              Continue Your Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sign in to access your personalized AI companions and pick up where you left off.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-4xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Your AI Companions</h3>
                  <p className="text-muted-foreground text-sm">Access all your personalized tutors</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Learning Progress</h3>
                  <p className="text-muted-foreground text-sm">Track your study sessions and improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue learning</p>
            </div>

            <div className="bg-white rounded-4xl shadow-2xl border border-border/50 p-8 flex items-center justify-center">
              <SignIn
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
      </div>
    </main>
  )
}

export default SignInPage