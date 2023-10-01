import Aside from '@/app/components/aside/aside'
import React from 'react'

export default function Console({children}) {
  return (
    <div className='bg-main-bg'>
      <div className='flex'>
        <Aside />

        <div className='w-full p-7'>
          {children}
        </div>
      </div>
    </div>
  )
}
