'use client';

import React, { useState } from 'react';
import Console from '../tempates/console/console';
import PosCategory from '../components/pos-category/pos-category';
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import PosProduct from '../components/pos-products/pos-products';

export default function Pos() {
    const [cartOpen, setCartOpen] = useState(false)
    const openCart = () => {
        if(cartOpen){
            setCartOpen(false)
        } else {
            setCartOpen(true)
        }
    }
    return (
        <Console>
            <div class="relative block md:flex">
                <div class={`w-full lg:w-[75%] ${cartOpen ? "hidden" : "block"} block p-2 md:p-7`}>
                    <PosCategory/>
                    <PosProduct/>
                </div>
                <div class={`${cartOpen ? "block" : "hidden"} lg:block sm:w-full md:w-[25%] h-screen bg-white p-4`}>
                    <div className='flex justify-between py-5 items-center'>
                        <h4 className='font-bold text-[20px]'>Customer Orders</h4>
                        <a className='cursor-pointer'><TrashIcon className="h-5 w-5 text-acc-color"/></a>
                    </div>
                </div>
            </div>
                <a onClick={() => openCart()} className='sm:hidden cursro-pointer fixed shadow-lg w-[30px] h-[30px] rounded-full bg-primary p-8 bottom-[20px] right-[20px]'>
                    <ShoppingBagIcon className="h-5 w-5 text-white absolute top-[34%] right-[34%]"/>
                </a>
        </Console>
    )
}