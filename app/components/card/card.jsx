'use client'
import React from 'react'

export default function Card({children, title}) {
  return (
    <div className='w-full bg-white p-6 rounded-lg shadow'>
        <div className='flex gap-x-3.5 items-center'>
            {/* <Icon strokeWidth={2} className="w-6 h-6 text-acc-color" /> */}
            {title ? '' : <h5 className='mb-2 text-lg mdtext-2xl font-bold tracking-tight text-acc-color'>{title}</h5>}
        </div>
        {children}
    </div>
  )
}
