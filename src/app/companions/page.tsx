import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { GetAllCompanions } from '@/lib/actions/companions.actions'
import { getSubjectColor } from '@/lib/utils';
import React from 'react'

const Companions_lib = async ({ searchParams }: SearchParams) => {

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  // console.log('PARAMS: ', filters);

  const Companions = await GetAllCompanions({ subject, topic })
  // console.log(Companions)
  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className='companions-grid'>
        {Companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  )
}

export default Companions_lib