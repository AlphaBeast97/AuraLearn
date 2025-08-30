'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navLinks = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Companion',
        href: '/companions'
    },
    {
        label: 'My Journey',
        href: '/my-journey'
    }
]

const NavItems = () => {

    const pathName = usePathname();

    return (
        <nav className='flex items-center gap-4'>
            {navLinks.map(({ label, href }) => (
                <Link key={label} href={href} className={`${pathName === href && 'text-primary font-semibold'}`}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems