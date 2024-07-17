import Image from 'next/image'
import React, { Fragment } from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="block">
        <Image src="/images/3793096.jpg" alt="brand" width={400} height={400} />
      </div>
    </div>
  )
}
