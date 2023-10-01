"use client";
import React from 'react';
import Image from 'next/image'
import Link from "next/link";

export default function Session({children}) {
  return (
    <div className="w-full flex items-stretch md:p-6 p-0">
      <div className="block bg-primary md:bg-white w-full h-[calc(100vh-3rem)] md:flex md:flex-row-reverse">
        <div className="w-full md:h-[calc(100vh-3rem)] md:block md:w-2/5 flex-1 bg-primary md:rounded-2xl p-8 lg:p-20">
          <Link href="/" className="flex mb-10 md:hidden block">
            <Image src="/images/logoipsum-296.svg" alt="brand" width={26} height={26} />
            <span className="text-lg text-white ml-1.5 font-bold">SwiftPOS</span>
          </Link>
          <h1 className="mb-4 text-[30px] lg:text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5x dark:text-white">Welcome to Swift Point of Sale System</h1>
          <h1 className="mb-4 md:text-lg font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-[20px] pt-4 dark:text-white">Efficient Sales Management at Your Fingertips</h1>
          <p className="text-[16px] font-normal text-white hidden md:block lg:text-[16] pt-6">Please log in to access your account and manage sales, inventory, and customer interactions seamlessly. Our user-friendly POS system is designed to enhance your business operations and provide a superior customer experience.</p>
        </div>
        <div className="w-full rounded-2xl bg-white h-[calc(100vh-3rem)] md:w-3/5 px-12 md:px-12 lg:px-32 py-9">
          <div className="w-full">
            <Link href="/" className="hidden md:flex">
              <Image src="/images/logoipsum-296.svg" alt="brand" width={26} height={26} />
              <span className="text-lg ml-1.5 font-bold">SwiftPOS</span>
            </Link>
          </div>
          
          { children }

          <div className="w-80 pt-9">
            <p className="text-acc-color">By Signing up, I agree to the <Link href="/" className="text-primary">Terms of service</Link> and <Link href="/" className="text-primary">Privacy Policy</Link></p>
          </div>

          <div className="w-full py-9">
            <p className="text-center text-acc-color text-xs">&copy; 2022, ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  );
}