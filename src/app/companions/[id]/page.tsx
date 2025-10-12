import CompanionComponent from "@/components/CompanionComponent";
import { GetCompanionById } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface CompanionSessionPageParams {
  params: Promise<{ id: string }>;
}

const Companion_Session = async ({ params }: CompanionSessionPageParams) => {
  const { id } = await params;
  const companion = await GetCompanionById(id);
  const { name, subject, topic, duration } = companion;
  const user = await currentUser();
  if (!name) redirect("/companions");

  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-purple-200/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/companions"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Companions
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="cta-badge mb-6 w-fit">
            🎓 Learning Session
          </div>
          <div className="bg-gradient-to-br from-white to-muted/20 rounded-4xl shadow-xl border border-border/50 p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-4xl" style={{ backgroundColor: getSubjectColor(subject) }}></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: getSubjectColor(subject) }}></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: getSubjectColor(subject) }}></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                <div className="flex items-start gap-6 sm:gap-8 flex-1">
                  <div
                    className="size-24 sm:size-28 lg:size-32 flex items-center justify-center rounded-4xl shadow-lg flex-shrink-0 ring-4 ring-white/50"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={60}
                      height={60}
                      className="sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]"
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6 min-w-0 flex-1">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ color: getSubjectColor(subject) }}>
                          {name}
                        </h1>
                        <div className="subject-badge shadow-md text-sm sm:text-base w-fit" style={{ backgroundColor: getSubjectColor(subject) }}>
                          {subject}
                        </div>
                      </div>
                      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                        {topic}
                      </p>
                    </div>

                    {/* Additional Info Row */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${getSubjectColor(subject)}30` }}>
                          <Image
                            src={'/icons/clock.svg'}
                            alt="duration"
                            height={18}
                            width={18}
                            className="sm:w-[20px] sm:h-[20px]"
                          />
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-bold text-foreground">{duration}</span>
                          <span className="text-lg text-muted-foreground font-medium">minutes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${getSubjectColor(subject)}30` }}>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-lg font-medium text-foreground">Interactive AI Tutor</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status/Action Area */}
                <div className="lg:text-right space-y-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-4xl p-4 sm:p-6 shadow-md border border-white/20">
                    <div className="text-sm sm:text-base text-muted-foreground mb-2">Session Status</div>
                    <div className="flex items-center gap-2 justify-center lg:justify-end">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-semibold text-foreground">Ready to Start</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companion Component */}
        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user?.firstName}
          userImage={user?.imageUrl}
        />
      </div>
    </main>
  )
}

export default Companion_Session