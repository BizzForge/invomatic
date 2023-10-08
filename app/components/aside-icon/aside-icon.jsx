import Link from 'next/link';
import React, { Fragment } from 'react'

export default function AsideIcon({ Icon, title, isOpen, link }) {
    return (
        <Link href={link} passHref>
            <div className={`flex py-3 ${isOpen ? 'justify-left' : 'justify-left'} space-x-[32px] transition-all duration-200 hover:font-bold hover:text-primary active:font-bold active:text-primary`} >
                <div className="w-6 h-6">
                    <Icon strokeWidth={2} className="md:w-6 md:h-6 text-acc-color" />
                </div>
                {isOpen && <div className='ml-[42px] text-[16px] text-acc-color whitespace-nowrap'>{title}</div>}
            </div>
        </Link>
    );
}