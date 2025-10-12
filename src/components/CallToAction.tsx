import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
    <section className='bg-cta text-white rounded-4xl p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden h-fit'>
      <div className="absolute inset-0 bg-gradient-to-br from-cta-gold/10 to-cta-gold/5 rounded-4xl"></div>
      <div className="relative z-10 w-full">
        <div className='cta-badge mb-4'>
          ✨ Start learning your way.
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">Build Your Perfect Learning Companion</h2>
        <p className="text-white/90 mb-6 leading-relaxed">Pick a name, subject, voice & personality - and start learning through voice conversations that feel natural and fun.</p>

        <div className="mb-6">
          <Image src={'/images/cta.svg'} alt='cta' width={280} height={180} className="mx-auto" />
        </div>

        <Link href={'/companions/new'} className="inline-block">
          <button className='bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-4xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 mx-auto cursor-pointer active:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/30'>
            <Image src={'/icons/plus.svg'} alt='plus' width={16} height={16} />
            Build a New Companion
          </button>
        </Link>
      </div>
    </section>
  )
}

export default CallToAction