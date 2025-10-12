import CompanionForm from '@/components/CompanionForm'
import { newCompanionsPermissions } from '@/lib/actions/companions.actions'
import Image from 'next/image'
import Link from 'next/link'

const New_Companion = async () => {

  const canCreateCompanion = await newCompanionsPermissions()

  return (
    <main className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {canCreateCompanion ? (
          <div className="w-full">
            {/* Header Section */}
            <div className="mb-8 sm:mb-12 text-center">
              <div className="cta-badge mb-4 sm:mb-6 w-fit mx-auto">
                🛠️ Create Your AI Tutor
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                Companion Builder
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Design a personalized AI learning companion tailored to your educational needs and preferences.
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-6 sm:p-8 lg:p-10">
              <CompanionForm />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white rounded-4xl shadow-lg border border-border/50 p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <Image
                  src='/images/limit.svg'
                  alt='Companion Limit Reached'
                  width={360}
                  height={230}
                  className="mx-auto mb-6"
                />
              </div>

              <div className="cta-badge mb-6 w-fit mx-auto">
                ⚡ Upgrade Your Plan
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                You&apos;ve Reached Your Limit
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                You&apos;ve reached your companion limit. Please upgrade your plan to create more companions and access premium features.
              </p>

              <Link
                href={'/subscription'}
                className='bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-4xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg inline-block'
              >
                Upgrade My Plan
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default New_Companion