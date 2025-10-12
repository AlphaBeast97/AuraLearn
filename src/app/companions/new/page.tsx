import CompanionForm from '@/components/CompanionForm'
import { newCompanionsPermissions } from '@/lib/actions/companions.actions'
import Image from 'next/image'
import Link from 'next/link'

const New_Companion = async () => {

  const canCreateCompanion = await newCompanionsPermissions()
  // console.log("canCreateCompanion", canCreateCompanion)
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
      {canCreateCompanion ? (
        <article className='w-full gap-4 flex flex-col'>
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className='companion-limit'>
          <Image
            src='/images/limit.svg'
            alt='Companion Limit Reached'
            width={360}
            height={230}
          />
          <div className="cta-badge">
            Upgrade Your Plan
          </div>
          <h1>You've Reached Your Limit</h1>
          <p>You've reached your companion limit. Please upgrade your plan to create more companions & and access premium features.</p>
          <Link
            href={'/subscription'}
            className='btn-primary w-full justify-center'
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  )
}

export default New_Companion