'use client'

import {useState, Fragment} from 'react'
import Image from 'next/image'
import Link from "next/link";
import AsideIcon from '../aside-icon/aside-icon';
import { ReceiptRefundIcon, InboxArrowDownIcon, MegaphoneIcon, ChartPieIcon, UserIcon, UsersIcon, BanknotesIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon, Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function Aside() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const menuItems = [
        {
          link: '/sales',
          Icon: ReceiptRefundIcon,
          title: 'Sales',
        },
        {
          link: '/inventory',
          Icon: InboxArrowDownIcon,
          title: 'Inventory Management',
        },
        {
          link: '/dashboard',
          Icon: ChartPieIcon,
          title: 'Analytics',
        },
        {
          link: '/dashboard',
          Icon: UserIcon,
          title: 'Customer Management',
        },
        {
          link: '/dashboard',
          Icon: MegaphoneIcon,
          title: 'Promos',
        },
        {
          link: '/dashboard',
          Icon: UsersIcon,
          title: 'Supplier Management',
        },
        {
          link: '/dashboard',
          Icon: BanknotesIcon,
          title: 'Financial Management',
        },
    ];

    return (
    <aside className={`w-full ${isOpen ? 'md:w-80 transition-width' : 'md:w-20 transition-width' } bg-[transparent] z-50 flex md:block md:bg-white p-5 h-20 md:h-[calc(100vh)] transform md:shadow-lg`}>
      <div className='flex md:block flex-row-reverse'>
        <div className='md:w-full my-1 md:my-4 pb-2'>
          <div onClick={toggleMenu} className={`flex w-full ${!isOpen ? 'justify-center' : 'justify-left'} cursor-pointer`}>
            {isOpen ? <XMarkIcon strokeWidth={2} className="w-6 h-6 text-acc-color"/> : <Bars3CenterLeftIcon strokeWidth={2} className="w-6 h-6 text-acc-color"/>}
          </div>
        </div>

        <div className='md:w-full my-2 mr-4 md:ml-0 md:my-12 pb-2'>
          <Link href='/dashboard' className={`flex w-full ${!isOpen ? 'justify-center' : 'justify-left'}`}>
              <Image src="/images/logoipsum-296.svg" alt="brand" width={26} height={26} />
              {isOpen && <span className="text-lg text-title-color ml-[30px] hidden md:block font-bold">SwiftPOS</span>}
          </Link>
        </div>
      </div>
      
      <div className='hidden md:block md:h-[calc(100vh-45%)]'>
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

      <div className="relative md:absolute md:bottom-0 md:left-0 w-full md:p-5 flex justify-right md:block">
          <div className="flex absolute md:relative right-0 top-1 items-center space-x-[30px]">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image src="/images/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="Profile" width={40} height={40} />
              </div>
              {isOpen && <p className="text-[16px] font-medium hidden md:block text-acc-color">Anwar Magara</p>}
          </div>
          <div className="hidden md:block mt-3">
              <AsideIcon link="/settings" Icon={Cog6ToothIcon} isOpen={isOpen} title={'Settings'}/>
              <AsideIcon link="/dashboard" Icon={ArrowLeftOnRectangleIcon} isOpen={isOpen} title={'Logout'}/>
          </div>
      </div>
    </aside>
    )
}
