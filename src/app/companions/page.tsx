import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { GetAllCompanions } from '@/lib/actions/companions.actions'
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

// Force dynamic rendering due to database queries
export const dynamic = 'force-dynamic';

const Companions_lib = async ({ searchParams }: SearchParams) => {

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const Companions = await GetAllCompanions({ subject, topic })

  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="cta-badge mb-4 sm:mb-6 w-fit">
            🤖 AI Learning Companions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Companion Library
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Discover AI tutors across different subjects and find the perfect learning companion for your educational journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <section className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Find Your Perfect Companion</h2>
              <p className="text-muted-foreground">Search by topic or filter by subject to discover AI tutors tailored to your learning needs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
              <SearchInput />
              <SubjectFilter />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section>
          {Companions.length > 0 ? (
            <>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {subject || topic ? 'Filtered Results' : 'All Companions'}
                  <span className="text-muted-foreground font-normal ml-2">({Companions.length} {Companions.length === 1 ? 'companion' : 'companions'})</span>
                </h2>
                {(subject || topic) && (
                  <p className="text-muted-foreground">
                    {subject && <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 mr-2">Subject: {subject}</span>}
                    {topic && <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">Topic: {topic}</span>}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {Companions.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 sm:py-20 px-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted/30 rounded-4xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">No Companions Found</h3>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
                {subject || topic
                  ? "We couldn't find any companions matching your search criteria. Try adjusting your filters or search terms."
                  : "It looks like there are no companions available at the moment. Check back later for new additions!"
                }
              </p>
              {(subject || topic) && (
                <Link
                  href="/companions"
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-4xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  Clear Filters
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Companions_lib