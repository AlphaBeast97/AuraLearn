'use client'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {

    const PathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery) {
                const newURL = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: searchQuery
                })

                router.push(newURL, { scroll: false })
            } else {
                if (PathName === '/companions') {
                    const newURL = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic'],
                    })
                    router.push(newURL, { scroll: false })
                }
            }
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [searchQuery, router, PathName, searchParams])


    return (
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
            <Image
                src='/icons/search.svg'
                alt='search'
                width={15}
                height={15}
            />
            <input
                type="text"
                placeholder='Search Companions...'
                className='outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput