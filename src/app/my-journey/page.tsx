import CompanionsList from "@/components/CompanionsList"
import { getUserCompanions, GetUserSessions } from "@/lib/actions/companions.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

// Force dynamic rendering due to authentication requirements
export const dynamic = 'force-dynamic';

const Profile = async () => {

  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }

  const companions = await getUserCompanions(user.id)
  const sessionHistory = await GetUserSessions(user.id)

  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="cta-badge mb-4 sm:mb-6 w-fit">
            👤 My Learning Journey
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Track your progress, review your recent sessions, and manage your AI learning companions.
          </p>
        </div>

        {/* Profile Section */}
        <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <div className="relative">
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={100}
                  height={100}
                  className="rounded-4xl shadow-lg border-3 border-white"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-muted-foreground">
                  {user.emailAddresses?.[0]?.emailAddress}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Active Learner</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-4 text-center min-w-[120px] border border-blue-200/50 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-foreground mb-1">
                  {sessionHistory.length}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  Sessions
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-4 text-center min-w-[120px] border border-purple-200/50 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-foreground mb-1">
                  {companions.length}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  Companions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {sessionHistory.length > 0 || companions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {/* Recent Sessions */}
            {sessionHistory.length > 0 ? (
              <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      Recent Sessions
                    </h2>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-0.5 rounded-full">
                      {sessionHistory.length}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">Your latest learning sessions</p>
                </div>
                <CompanionsList
                  title=""
                  companions={sessionHistory}
                  classNames="w-full"
                />
              </section>
            ) : (
              <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No Recent Sessions</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">Start a session with one of your companions to see your recent activity here</p>
                </div>
              </section>
            )}

            {/* My Companions */}
            {companions.length > 0 ? (
              <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      My Companions
                    </h2>
                    <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-2 py-0.5 rounded-full">
                      {companions.length}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">AI tutors you&apos;ve created</p>
                </div>
                <CompanionsList
                  title=""
                  companions={companions}
                  classNames="w-full"
                />
              </section>
            ) : (
              <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No Companions Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">Create your first AI learning companion to get started</p>
                  <Link
                    href="/companions/new"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Create Companion
                  </Link>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Empty State */
          <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-8">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Start Your Learning Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first AI companion and begin your personalized learning experience.
              </p>
              <Link
                href="/companions/new"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-4xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Your First Companion
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Profile