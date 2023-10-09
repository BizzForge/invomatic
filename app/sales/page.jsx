'use client'
import React, {useState} from 'react'
import Console from '../tempates/console/console'
import Card from '../components/card/card'
import Image from 'next/image'
import { CalendarDaysIcon, EllipsisVerticalIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import ButtonWithIcon from '../components/buttons/button-with-icon/button-with-icon'
// import Filter from '../components/filter/filter'
import Link from 'next/link'

export default function Sales() {
  const handleClick = () => {
    console.log("Button clicked!");
  }
  return (
    <Console>
      <h3 className='text-title-color text-3xl mb-10 font-bold'>Sales</h3>
      <div className='flex justify-between items-center mb-4'>
        <ButtonWithIcon Icon={PlusIcon} href="/inventory/new" text={'New Sale'} onClick={handleClick}/>
        {/* <Filter /> */}
      </div>
      <div className='flex flex-wrap -mx-4'>

        <div className='w-full md:w-1/3 px-4 mb-3 relative'>
          <Card>
            <div className='w-full flex justify-between mb-3'>
              <div className='flex items-center'>
                <p>#6709</p>
                <span className="bg-success ml-2 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Complete</span>
              </div>
              <p className='text-primary'>2023-10-24</p>
            </div>
            <div className='w-full pb-5' style={{ borderBottom: '0.4px solid #777777', overflowY: 'auto', maxHeight: '300px', height: '100px' }}>
              <div className='w-full flex justify-between'>
                <p className='text-acc-color'>Absolute Lime</p>
                <p className='font-bold text-acc-color'>Ksh. 2562</p>
              </div>
              <div className='w-full flex justify-between'>
                <p className='text-acc-color'>Johnnie Walker Blue Label</p>
                <p className='font-bold text-acc-color'>Ksh.  26,000</p>
              </div>
              <div className='w-full flex justify-between'>
                <p className='text-acc-color'>White Walker Whiskey</p>
                <p className='font-bold text-acc-color'>Ksh. 76,200</p>
              </div>
            </div>
            <div className='w-full flex justify-between py-3'>
              <p className='text-acc-color'>Total</p>
              <p className='font-bold text-acc-color'>Ksh. 104,762</p>
            </div>
            <div className='w-full flex justify-between relative items-center mt-6'>
              <div className="flex items-center space-x-4">
                  <Image className="w-10 h-10 rounded-full" src="/images/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="Profile" width={40} height={40} />
                  <div className="font-medium dark:text-white">
                      <div className='text-acc-color font-bold'>Jese Leos</div>
                  </div>
              </div>
              <div className='p-3 bg-main-bg cursor-pointer rounded'>
                <EllipsisVerticalIcon className="h-5 w-5 text-acc-color"/>
                <div className='bg-white p-5 absolute rounded-lg shadow-xl right-0 top-14 w-1/2'>
                  <Link href="/" className='flex py-3 justify-between items-center hover:bg-main-bg px-4 rounded-lg hover:text-primary'>
                    <p className='text-acc-color'>Edit</p>
                    <PencilIcon className="h-5 w-5 text-acc-color"/>
                  </Link>
                  <div className='cursor-pointer py-3 flex justify-between items-center hover:bg-main-bg px-4 rounded-lg'>
                    <p className='text-acc-color'>Delete</p>
                    <TrashIcon className="h-5 w-5 text-acc-color"/>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </Console>
  )
}
