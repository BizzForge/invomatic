'use client';

import React from 'react';
import Console from '../tempates/console/console';
import PosCategory from '../components/pos-category/pos-category';
import { TrashIcon } from '@heroicons/react/24/outline';
import PosProduct from '../components/pos-products/pos-products';

export default function Pos() {
    return (
        <Console>
            <div class="relative block md:flex">
                <div class="w-full md:w-[75%] p-2 md:p-7">
                    <PosCategory/>
                    <PosProduct/>
                </div>
                <div class="sm:w-full md:w-[25%] h-screen bg-white p-4">
                    <div className='flex justify-between py-5 items-center'>
                        <h4 className='font-bold text-[20px]'>Customer Orders</h4>
                        <a className='cursor-pointer'><TrashIcon className="h-5 w-5 text-acc-color"/></a>
                    </div>
                </div>
            </div>
        </Console>
    )
}