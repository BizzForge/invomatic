'use client'

import {useState, Fragment} from 'react'
import Image from 'next/image'
import Link from "next/link";
import AsideIcon from '../aside-icon/aside-icon';
import { ReceiptRefundIcon, InboxArrowDownIcon, MegaphoneIcon, ChartPieIcon, UserIcon, UsersIcon, BanknotesIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';


export default function Aside() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const menuItems = [
        // {
        //   link: '/sales',
        //   Icon: ReceiptRefundIcon,
        //   title: 'Sales',
        // },
        {
          link: '/inventory',
          Icon: InboxArrowDownIcon,
          title: 'Inventory Management',
        },
        // {
        //   link: '/dashboard',
        //   Icon: ChartPieIcon,
        //   title: 'Analytics',
        // },
        // {
        //   link: '/dashboard',
        //   Icon: UserIcon,
        //   title: 'Customer Management',
        // },
        // {
        //   link: '/dashboard',
        //   Icon: MegaphoneIcon,
        //   title: 'Promos',
        // },
        // {
        //   link: '/dashboard',
        //   Icon: UsersIcon,
        //   title: 'Supplier Management',
        // },
        // {
        //   link: '/dashboard',
        //   Icon: BanknotesIcon,
        //   title: 'Financial Management',
        // },
    ];

    return (
    <aside className={`w-${isOpen ? '[325px]' : '[72px]' } bg-white p-5 h-[calc(100vh)] transition-width transform shadow-lg`}>
        <div className='w-full my-12 pb-2'>
            <Link href="/dashboard" onClick={toggleMenu} className={`flex w-full ${!isOpen ? 'justify-center' : 'justify-left'}`}>
                <Image src="/images/logoipsum-296.svg" alt="brand" width={26} height={26} />
                {isOpen && <span className="text-lg text-title-color ml-[30px] font-bold">SwiftPOS</span>}
            </Link>
        </div>
        
        <div className='h-[calc(100vh-45%)]'>
            {menuItems.map((menuItem, index) => (
            <AsideIcon
                key={index}
                link={menuItem.link}
                Icon={menuItem.Icon}
                isOpen={isOpen}
                title={menuItem.title}
            />
            ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-5">
            <div className="flex items-center space-x-[30px]">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image src="/images/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="Profile" width={40} height={40} />
                </div>
                {isOpen && <p className="text-[16px] font-medium text-acc-color">Anwar Magara</p>}
            </div>
            <div className="mt-3">
                <AsideIcon link="/settings" Icon={Cog6ToothIcon} isOpen={isOpen} title={'Settings'}/>
                <AsideIcon link="/dashboard" Icon={ArrowLeftOnRectangleIcon} isOpen={isOpen} title={'Logout'}/>
            </div>
        </div>
    </aside>
    )
}
