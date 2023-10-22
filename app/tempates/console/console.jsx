import Aside from '@/app/components/aside/aside'
import React from 'react'

export default function Console({children}) {
  return (
    <div className='bg-main-bg'>
      <div className='block md:flex'>
        <Aside />

        <div className='w-full overflow-auto md:ml-16'>
          {children}
        </div>
      </div>
    </div>
  )
}
