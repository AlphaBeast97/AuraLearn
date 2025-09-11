'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const NavBar = () => {

    return (
        <nav className='navbar'>
            <Link href={'/'}>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image
                        src='/images/logo.jpg'
                        alt='logo'
                        width={46}
                        height={44}
                    ></Image>
                </div>
            </Link>
            <div className='flex items-center gap-8'>
                <NavItems />
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className='btn-signin'>Sign In</button>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    )
}

export default NavBar