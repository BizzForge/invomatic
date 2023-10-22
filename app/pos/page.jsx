'use client';

import React, { useState, useEffect } from 'react';
import Console from '../tempates/console/console';
import PosCategory from '../components/pos-category/pos-category';
import { BanknotesIcon, CreditCardIcon, PencilIcon, ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PosProduct from '../components/pos-products/pos-products';

export default function Pos() {
    const taxRate = 0.16;
    const [cartProducts, setCartProducts] = useState([]);

    const addQuantityForDuplicateIDs = (array) => {
        const idMap = {}; 
      
        for (const obj of array) {
            if (idMap.hasOwnProperty(obj.id)) {
                idMap[obj.id].quantity += obj.quantity;
                idMap[obj.id].originalPrice = obj.originalPrice;
                let quantity = idMap[obj.id].quantity;
                idMap[obj.id].updatedPrice = obj.price * quantity;
            } else {
                idMap[obj.id] = { ...obj };
            }
        }
      
        return Object.values(idMap);
    }     

    useEffect(() => {
        const addCartProducts = (e) => {
            const productToAdd = e.detail.product;            
            const objectsWithAggregatedQuantity = addQuantityForDuplicateIDs(productToAdd);
            setCartProducts(objectsWithAggregatedQuantity);
        };
    
        window.addEventListener('addToCart', addCartProducts);
    
        return () => {
            window.removeEventListener('addToCart', addCartProducts);
        };
    }, [cartProducts]);

    const calculateSubTotalPrice = () => {
        if (cartProducts.length === 0) {
          return 0;
        }
      
        const totalPrice = cartProducts.reduce((total, product) => total +  product.updatedPrice ? product.updatedPrice : product.price, 0);
      
        return totalPrice;
    };

    const calculateTaxAmount = () => {
        const totalPrice = calculateSubTotalPrice();
        const taxAmount = totalPrice * taxRate;
        return taxAmount;
    };

    const removeCartProduct = (productToRemove) => {
        const updatedCart = cartProducts.filter(product => product !== productToRemove);
    
        setCartProducts(updatedCart);
    }

    const [editableIndex, setEditableIndex] = useState(-1);

    const handleStartEdit = (index) => {
        setEditableIndex(index);
    };

    const handleFinishEdit = () => {
        setEditableIndex(-1);
    };

    const handleQuantityEdit = (e, index) => {
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity = parseInt(e.target.value, 10); // Ensure it's a number
        setCartProducts(updatedCart);
        handleFinishEdit();
    };

    return (
        <Console>
            <div className="relative block md:flex">
                <div className={`w-full lg:w-[70%] block p-2 md:p-7`}>
                    <PosCategory />
                    <PosProduct />
                </div>
                <div className={`lg:block md:w-full lg:w-[30%] h-screen bg-white`}>
                    <div className='flex justify-between py-5 px-5 items-center'>
                        <h4 className='font-bold text-2xl'>Customer Orders</h4>
                        <a className='cursor-pointer p-2'><TrashIcon className="h-5 w-5 text-acc-color"/></a>
                    </div>

                    <div className='h-2/5 overflow-y-auto'>
                        <ul className="max-w-md divide-y divide-acc-btn p-5 px-16">
                            {cartProducts.length === 0 ? (<p className='w-full text-center text-acc-btn'>cart is empty</p>) : (
                                Array.isArray(cartProducts) && cartProducts.map((product, index) => (
                                    <li className="sm:py-4" key={index}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-500 font-bold truncate">
                                                    {product.productTitle}
                                                </p>
                                                <p className="text-sm text-acc-color truncate">
                                                {product.subtitle} - Ksh {product.price}
                                                </p>
                                            </div>
                                            {editableIndex === index ? (
                                                <input
                                                    type="number"
                                                    className='bg-[transparent]'
                                                    value={product.quantity}
                                                    onChange={(e) => handleQuantityEdit(e, index)}
                                                    onBlur={handleFinishEdit}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleFinishEdit();
                                                        }
                                                    }}
                                                    style={{
                                                        width: '3rem',
                                                        padding: '0.25rem', 
                                                        backgroundColor: 'transparent',
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className='bg-acc-btn flex justify-center items-center w-7 h-7 rounded-md'
                                                    onClick={() => handleStartEdit(index)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {product.quantity}
                                                </div>
                                            )}
                                            <div className="inline-flex items-center text-base font-semibold text-acc-color">
                                                Ksh. {product.updatedPrice ? product.updatedPrice : product.price} 
                                            </div>
                                            <div className='flex gap-2'>
                                                <a className='cursor-pointer p-2' onClick={() => removeCartProduct(product)}>
                                                    <XMarkIcon className="h-5 w-5 text-acc-color"/>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className='w-full pt-8 px-16 pb-10'>
                        <div className='flex justify-between items-center pb-3'>
                            <p className='text-acc-color'>Subtotal</p>
                            <p className='font-bold'>Ksh. {calculateSubTotalPrice().toLocaleString()}</p>
                        </div>
                        <div className='flex justify-between pb-3 items-center border-dashed border-b-2 border-acc-color'>
                            <p className='text-acc-color'>Tax 16%</p>
                            <p className='font-bold'>Ksh. {calculateTaxAmount().toLocaleString()}</p>
                        </div>
                        <div className='flex justify-between items-center pt-3'>
                            <p className='text-acc-color text-2xl'>Total</p>
                            <p className='font-bold text-2xl'>Ksh. {calculateSubTotalPrice() + calculateTaxAmount()}</p>
                        </div>
                    </div>

                    <div className='px-16'>
                        <h4 className='font-bold text-2xl'>Payment Method</h4>
                        <div className='flex gap-3 mt-3'>
                            <a className='cursor-pointer text-center'>
                                <div className='p-4 bg-acc-btn rounded-lg  hover:bg-primary hover:text-white'>
                                    <BanknotesIcon className="h-5 w-5 text-acc-color"/>
                                </div>
                                <p className='text-sm text-acc-color mt-2'>Cash</p>
                            </a>

                            <a className='cursor-pointer text-center'>
                                <div className='p-4 bg-acc-btn rounded-lg hover:bg-primary hover:text-white'>
                                    <CreditCardIcon className="h-5 w-5 text-acc-color"/>
                                </div>
                                <p className='text-sm text-acc-color mt-2'>Debit</p>
                            </a>
                        </div>
                    </div>

                    <div className='px-16 flex gap-2 pt-5'>
                        <button type="button" className="text-acc-color bg-acc-btn hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Put on hold</button>
                        <button type="button" className="text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Proceed</button>
                    </div>
                </div>
            </div>
            <a onClick={() => openCart(product)} className='lg:hidden cursor-pointer fixed shadow-lg w-[30px] h-[30px] rounded-full bg-primary p-8 bottom-[20px] right-[20px]'>
                <ShoppingBagIcon className="h-5 w-5 text-white absolute top-[34%] right-[34%]"/>
            </a>
        </Console>
    );
}