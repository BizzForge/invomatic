import Link from 'next/link';
import React, { Fragment } from 'react';

export default function AsideIcon({ Icon, title, isOpen, link, isActive }) {
    return (
        <Link href={link} passHref>
            <div className={`flex py-3 ${isOpen ? 'justify-left' : 'justify-left'} rounded-lg space-x-[32px] px-2.5 transition-all duration-200 hover:font-bold hover:text-primary hover:bg-main-bg ${isActive ? '!bg-primary font-bold text-white' : ''}`} >
                <div className="w-6 h-6">
                    <Icon strokeWidth={2} className={`md:w-6 md:h-6 text-acc-color ${isActive ? 'text-white' : ''}`} />
                </div>
                {isOpen && <div className={`ml-[42px] text-[16px] text-acc-color whitespace-nowrap ${isActive ? 'text-white' : ''}`}>{title}</div>}
            </div>
        </Link>
    );
}