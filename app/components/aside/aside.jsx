'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from "next/link";


export default function Aside() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
        <aside className={`w-${isOpen ? '[325px]' : '72px' } bg-white p-5 h-[calc(100vh)] transition-width transition-transform transform shadow-lg`}>
            <div className='w-full pb-2'>
                <Link href="/dashboard" onClick={toggleMenu} className={`flex w-full ${!isOpen ? 'justify-center' : 'justify-left'}`}>
                    <Image src="/images/logoipsum-296.svg" alt="brand" width={26} height={26} />
                    {isOpen && <span className="text-lg text-title-color ml-3 font-bold">SwiftPOS</span>}
                </Link>
            </div>
        </aside>
    )
}
