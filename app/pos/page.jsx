'use client';

import React, {useState} from 'react';
import Console from '../tempates/console/console';
import PosCategory from '../components/pos-category/pos-category';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PosProduct from '../components/pos-products/pos-products';
import Cart from '../components/cart/cart';

export default function Pos() {
    const [cartOpen, setCartOpen] = useState(false)
    const openCart = () => {
        setCartOpen(!cartOpen)
    }

    return (
        <Console>
            <div className={`relative mt-20 md:mt-0 block md:flex`}>
                <div className={`w-full md:w-[68.8%] ${!cartOpen ? "block" : "hidden"} overflow-auto block p-2 md:p-7 md:mr-7`}>
                    <PosCategory />
                    <PosProduct />
                </div>
                
                <div className={`md:block ${cartOpen ? "block" : "hidden"}`}>
                    <Cart cartOpen={cartOpen}/>
                </div>
            </div>
            <a onClick={() => openCart()} className='lg:hidden cursor-pointer fixed shadow-lg w-[30px] h-[30px] rounded-full bg-primary p-8 bottom-[20px] right-[20px]'>
                {cartOpen ? (
                    <XMarkIcon className="h-5 w-5 text-white absolute top-[34%] right-[34%]"/>
                    ) : (
                    <ShoppingBagIcon className="h-5 w-5 text-white absolute top-[34%] right-[34%]"/>
                )}
            </a>
        </Console>
    );
}