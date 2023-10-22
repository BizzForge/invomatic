'use client';

import React from 'react';
import Console from '../tempates/console/console';
import PosCategory from '../components/pos-category/pos-category';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import PosProduct from '../components/pos-products/pos-products';
import Cart from '../components/cart/cart';

export default function Pos() {

    return (
        <Console>
            <div className="relative block md:flex">
                <div className={`w-full sm:w-[68.8%] block p-2 md:p-7 md:mr-7`}>
                    <PosCategory />
                    <PosProduct />
                </div>
                
                <Cart />
            </div>
            <a className='lg:hidden cursor-pointer fixed shadow-lg w-[30px] h-[30px] rounded-full bg-primary p-8 bottom-[20px] right-[20px]'>
                <ShoppingBagIcon className="h-5 w-5 text-white absolute top-[34%] right-[34%]"/>
            </a>
        </Console>
    );
}