import CallToAction from "@/components/CallToAction";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { GetAllCompanions, GetRecentSessions } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";

const DashboardPage = async () => {

    const companions = await GetAllCompanions({ limit: 3 });
    const recentSessionsCompanion = await GetRecentSessions();

    return (
        <main className="min-h-screen bg-background relative">
            {/* Subtle background decoration */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-40 left-10 w-96 h-96 bg-purple-200/5 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
                {/* Welcome Header */}
                <div className="mb-8 sm:mb-12">
                    <div className="cta-badge mb-4 sm:mb-6 w-fit">
                        👋 Welcome back to your dashboard
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                        Popular Companions
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Discover trending AI tutors and continue your learning journey with personalized companions.
                    </p>
                </div>

                {/* Popular Companions Section */}
                <section className="mb-12 sm:mb-16">
                    {companions.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6">
                            {companions.map((companion) => (
                                <CompanionCard
                                    key={companion.id}
                                    id={companion.id}
                                    name={companion.name}
                                    topic={companion.topic}
                                    subject={companion.subject}
                                    duration={companion.duration}
                                    color={getSubjectColor(companion.subject)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 px-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">No Companions Yet</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-sm mx-auto">Create your first AI learning companion to get started</p>
                        </div>
                    )}
                </section>

                {/* Dynamic Layout Based on Content */}
                {recentSessionsCompanion.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-12 items-start">
                        <div className="lg:col-span-3 xl:col-span-2 order-2 lg:order-1">
                            <CompanionsList
                                title='Recently Completed Sessions'
                                companions={recentSessionsCompanion}
                                classNames='w-full'
                            />
                        </div>
                        <div className="lg:col-span-2 xl:col-span-1 order-1 lg:order-2">
                            <CallToAction />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:gap-12 items-start">
                        <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 order-2 lg:order-1">
                            <div className="text-center py-8 sm:py-12">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">No Recent Sessions</h3>
                                <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">Start a session with one of your companions to see your progress here</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <CallToAction />
                        </div>
                    </div>
                )}

                {/* Dynamic Stats Section */}
                {(companions.length > 0 || recentSessionsCompanion.length > 0) && (
                    <section className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border/20">
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">Your Learning Statistics</h2>
                            <p className="text-sm sm:text-base text-muted-foreground">Track your progress and achievements</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8">
                            {companions.length > 0 && (
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-4xl shadow-lg border border-blue-200/50 p-8 text-center min-w-[280px] w-full sm:w-auto sm:flex-1 sm:max-w-[380px] lg:max-w-[420px] hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-4xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">{companions.length}</h3>
                                    <p className="text-muted-foreground font-medium text-lg">Available Companions</p>
                                </div>
                            )}

                            {recentSessionsCompanion.length > 0 && (
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-4xl shadow-lg border border-green-200/50 p-8 text-center min-w-[280px] w-full sm:w-auto sm:flex-1 sm:max-w-[380px] lg:max-w-[420px] hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-4xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">{recentSessionsCompanion.length}</h3>
                                    <p className="text-muted-foreground font-medium text-lg">Recent Sessions</p>
                                </div>
                            )}

                            {(companions.length > 0 || recentSessionsCompanion.length > 0) && (
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-4xl shadow-lg border border-purple-200/50 p-8 text-center min-w-[280px] w-full sm:w-auto sm:flex-1 sm:max-w-[380px] lg:max-w-[420px] hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-4xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                                        {recentSessionsCompanion.length > 0 ? '100%' : '0%'}
                                    </h3>
                                    <p className="text-muted-foreground font-medium text-lg">Learning Progress</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default DashboardPage;