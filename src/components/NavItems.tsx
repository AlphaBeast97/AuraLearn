'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const authenticatedNavLinks = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Companions',
        href: '/companions'
    },
    {
        label: 'My Journey',
        href: '/my-journey'
    }
]

const publicNavLinks = [
    {
        label: 'Home',
        href: '/'
    }
]

const NavItems = () => {

    const pathName = usePathname();

    return (
        <nav className='flex items-center gap-4'>
            <SignedIn>
                {authenticatedNavLinks.map(({ label, href }) => (
                    <Link key={label} href={href} className={`${pathName === href && 'text-primary font-semibold'}`}>
                        {label}
                    </Link>
                ))}
            </SignedIn>
            <SignedOut>
                {publicNavLinks.map(({ label, href }) => (
                    <Link key={label} href={href} className={`${pathName === href && 'text-primary font-semibold'}`}>
                        {label}
                    </Link>
                ))}
            </SignedOut>
        </nav>
    )
}

export default NavItems