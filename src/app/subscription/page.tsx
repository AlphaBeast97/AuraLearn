import { PricingTable } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// Force dynamic rendering due to authentication requirements
export const dynamic = 'force-dynamic';

const Subscription = async () => {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-200/5 to-purple-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-r from-purple-200/5 to-pink-200/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-0 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="cta-badge mb-4 sm:mb-6 w-fit mx-auto">
            💳 Choose Your Plan
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Unlock Your Learning Potential
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your educational journey. Create more AI companions, access premium features, and accelerate your learning.
          </p>
        </div>

        {/* User Info Card */}
        <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <Image
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width={80}
                height={80}
                className="rounded-4xl shadow-lg border-3 border-white"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">
                {user.emailAddresses?.[0]?.emailAddress}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600 font-medium">Ready to upgrade</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Unlimited Companions</h3>
              <p className="text-muted-foreground text-sm">Create unlimited AI tutors across all subjects with premium plans.</p>
            </div>

            <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Premium Voice Quality</h3>
              <p className="text-muted-foreground text-sm">Access to high-quality voice models and advanced conversation features.</p>
            </div>

            <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground text-sm">Detailed insights, progress tracking, and personalized recommendations.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Choose Your Plan</h2>
            <p className="text-muted-foreground">Select the plan that best fits your learning goals</p>
          </div>

          {/* Clerk Pricing Table Container */}
          <div className="relative clerk-pricing-container">
            <PricingTable />
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-cta/5 rounded-4xl p-6 sm:p-8 border border-border/20">
            <h3 className="text-xl font-bold text-foreground mb-2">Need Help Choosing?</h3>
            <p className="text-muted-foreground mb-4">
              Our team is here to help you find the perfect plan for your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@auralearn.com"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-4xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.16a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-border hover:bg-muted/50 text-foreground font-semibold py-3 px-6 rounded-4xl transition-all duration-300"
              >
                Continue with Free Plan
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Subscription