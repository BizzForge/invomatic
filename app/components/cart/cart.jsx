'use client';

import React, {useRef, useState, useEffect } from 'react';
import { BanknotesIcon, CreditCardIcon, DevicePhoneMobileIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import { add, remove, update } from '@/redux/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Cart(cartOpen) {
    const inputRef = useRef(null);
    const taxRate = 0.16;
    const dispatch = useAppDispatch();
    const allCartProducts = useAppSelector(state=>state);

    const [cartProducts, setCartProducts] = useState([]);
    const [editableIndex, setEditableIndex] = useState(-1);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [productInCart, setProductInCart] = useState(true);

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
        const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        setProductInCart(false);
        if (savedCartProducts) {
            setCartProducts(savedCartProducts);
        } else {
            setCartProducts([]);
        }
    }, []);

    useEffect(() => {
        const addCartProducts = async (e) => {
            const productToAdd = e.detail.product;
        
            setProductInCart(false);
        
            const objectsWithAggregatedQuantity = addQuantityForDuplicateIDs(productToAdd);
            
            const cartWithUpdatedPrice = objectsWithAggregatedQuantity.map(product => ({
                ...product,
                payload: {
                    ...product.payload,
                    item: {
                        ...product.payload.item,
                        updatedPrice: product.payload.item.price * product.quantity
                    }
                }
            }));
        
            setCartProducts(cartWithUpdatedPrice);
            
            localStorage.setItem('cartProducts', JSON.stringify([...cartWithUpdatedPrice]));
        };

        window.addEventListener('addToCart', addCartProducts);

        return () => {
            window.removeEventListener('addToCart', addCartProducts);
        };
    }, [cartProducts]);

    const calculateSubTotalPrice = () => {
        const total = allCartProducts.cart
                    .map(item=>Number(item.payload.item.price)*Number(item.payload.quantity))
                    .reduce((prev,curr)=>prev+curr,0);
        
        return total;
        // if (cartProducts.length === 0) {
        //     return 0;
        // }

        // const totalPrice = cartProducts.reduce((total, product) => total + (product.updatedPrice ? product.updatedPrice : product.price), 0);

        // return totalPrice;
    };

    const calculateTaxAmount = () => {
        const totalPrice = calculateSubTotalPrice();
        const taxAmount = totalPrice * taxRate;
        return taxAmount;
    };

    

    // const removeCartProduct = (productToRemove) => {
    //     const updatedCart = cartProducts.filter((product) => product.id !== productToRemove.id);
    //     setProductInCart(false);
    //     setCartProducts(updatedCart);
    
    //     const updatedCartJSON = JSON.stringify(updatedCart);
    //     localStorage.setItem('cartProducts', updatedCartJSON);
    // }

    const handleStartEdit = (index) => {
        setEditableIndex(index);
    };

    const handleFinishEdit = () => {
        setEditableIndex(-1);
    };

    const handleQuantityEdit = (e, index) => {
        let availableCartProducts = [...allCartProducts.cart];
        if(e.target.value>0){
            for(let i=0;i<availableCartProducts.length;i++){
                if(availableCartProducts[index].payload.item.id == availableCartProducts[i].payload.item.id){
                    let val  = {...availableCartProducts[index].payload};
                    val.quantity = parseInt(e.target.value);
                    availableCartProducts[index] = {payload:val};
                    break;
                }
            }
            
            dispatch(update(availableCartProducts));
        }else{
            removeProduct(allCartProducts.cart[index].payload.item);
        }

        try {
            localStorage.removeItem("cartProducts");
            localStorage.setItem("cartProducts",JSON.stringify(availableCartProducts));
            handleFinishEdit();
        } catch (error) {
            throw new Error("Unable to update local storage");
        }
        
        return;
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity = parseInt(e.target.value, 10); // Ensure it's a number
        setCartProducts(updatedCart);
        handleFinishEdit();
    };

    // const clearCartProducts = () => {
    //     setCartProducts([]);
    //     setProductInCart(true)
    //     localStorage.removeItem('cartProducts');
    // };

    const proceedCart = async () => {
        switch (paymentMethod) {
            case 'debit':
                const debitMethod = new CustomEvent('paymentMethod', {
                    detail: {   
                        method: paymentMethod,
                        display: true,
                    }
                })

                window.dispatchEvent(debitMethod)
            break;

            default:
                const cashMethod = new CustomEvent('paymentMethod', {
                    detail: {   
                        method: paymentMethod,
                        display: true,
                        subtotal: calculateSubTotalPrice().toLocaleString(),
                        tax: calculateTaxAmount().toLocaleString(),
                        total: (calculateSubTotalPrice() + calculateTaxAmount()).toLocaleString(),
                        products: cartProducts
                    }
                })

                window.dispatchEvent(cashMethod)
        }
    }

    const setMethod = method => {
        setPaymentMethod(method)
    }


    const removeProduct = (product)=>{
        let availableProducts = [...allCartProducts.cart];
        let prods = availableProducts.filter(prod=>prod.payload.item.id !== product.id);
        dispatch(update(prods));
        try {
            localStorage.removeItem("cartProducts");
            localStorage.setItem("cartProducts",JSON.stringify(prods));
        } catch (error) {
            throw new Error("Unable to delete local storage");
        }
    }

    const removeAll = ()=>{
        dispatch(remove());
        try {
            localStorage.removeItem("cartProducts");
        } catch (error) {
            throw new Error("Unable to delete local storage");
        }
        
    }

    useEffect(()=>{
        const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (savedCartProducts) {
            dispatch(update(savedCartProducts));
        }
    },[]);

    return (
        <div className={`lg:block w-full md:w-[30%] overflow-auto fixed no-scrollbar right-0 h-screen bg-white`}>
            <div className='flex justify-between py-5 px-8 md:px-10 items-center'>
                <h4 className='font-bold text-2xl'>Customer Orders</h4>
                <button className='cursor-pointer p-2 bg-acc-btn rounded-md hover:bg-danger-mute' onClick={() => {
                    //clearCartProducts();
                    removeAll();
                    }}><TrashIcon className="h-5 w-5 text-acc-color"/></button>
            </div>
 
            <div className='h-1/5 sm:h-2/5 no-scrollbar overflow-y-auto scroll-smooth px-8 md:px-10'>
                <ul className="max-w-md divide-y divide-acc-btn">
                    {allCartProducts.cart.length === 0 ? (<p className='w-full text-center text-acc-btn'>cart is empty</p>) : (
                        Array.isArray(allCartProducts.cart) && allCartProducts.cart.map((product, index) => 
                        {
                            return(
                                <li className="py-4" key={index}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-500 font-bold truncate">
                                            {product.payload.item?.productTitle}
                                        </p>
                                        <p className="text-sm text-acc-color truncate">
                                        {product.payload.item?.subtitle} - Ksh {product.payload.item?.price.toLocaleString()}
                                        </p>
                                    </div>
                                    {editableIndex === index ? (
                                        <input
                                            type="number"
                                            className='bg-[transparent]'
                                            value={product.payload.quantity}
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
                                            {product.payload.quantity.toLocaleString()}
                                        </div>
                                    )}
                                    <div className="inline-flex items-center text-base font-semibold text-acc-color">
                                        Ksh. {(product.payload.item?.price * product.payload.quantity).toLocaleString()} 
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            className='cursor-pointer p-2 bg-acc-btn rounded-md hover:bg-danger-mute'
                                            onClick={() => {
                                                //removeCartProduct(product.payload.item);
                                                removeProduct(product.payload.item);
                                            }}
                                        >
                                            <XMarkIcon className="h-5 w-5 text-acc-color hover:text-danger" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                            )
                        })
                    )}
                </ul>
            </div>

            <div className='w-full pt-8 px-8 md:px-10 pb-10'>
                <div className='flex justify-between items-center pb-3'>
                    <p className='text-acc-color'>Subtotal</p>
                    <p className='font-bold'>Ksh. {calculateSubTotalPrice().toLocaleString()}</p>
                </div>
                <div className='flex justify-between pb-3 items-center border-dashed border-b-2 border-acc-color'>
                    <p className='text-acc-color'>Tax {taxRate * 100}%</p>
                    <p className='font-bold'>Ksh. {calculateTaxAmount().toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center pt-3'>
                    <p className='text-acc-color text-2xl'>Total</p>
                    <p className='font-bold text-2xl'>Ksh. {(calculateSubTotalPrice() + calculateTaxAmount()).toLocaleString()}</p>
                </div>
            </div>

            <div className='px-8 md:px-10'>
                <h4 className='font-bold text-2xl'>Payment Method</h4>
                <div className='flex gap-3 mt-3'>
                    <button onClick={() => setMethod('cash')} className="cursor-pointer text-center btn">
                        <div className={`p-4 bg-acc-btn rounded-lg  hover:pl-color ${paymentMethod === 'cash' ? 'active' : ''}`}>
                            <BanknotesIcon className="h-5 w-5 text-acc-color"/>
                        </div>
                        <p className='text-sm text-acc-color mt-2'>Cash</p>
                    </button>

                    <button onClick={() => setMethod('mpesa')} className={`cursor-pointer text-center btn`}>
                        <div className={`p-4 bg-acc-btn rounded-lg hover:pl-color ${paymentMethod === 'mpesa' ? 'active' : ''}`}>
                            <DevicePhoneMobileIcon className="h-5 w-5 text-acc-color"/>
                        </div>
                        <p className='text-sm text-acc-color mt-2'>Mpesa</p>
                    </button>

                    {/* <button onClick={() => setMethod('debit')} className={`cursor-pointer text-center btn`}>
                        <div className={`p-4 bg-acc-btn rounded-lg hover:pl-color ${paymentMethod === 'debit' ? 'active' : ''}`}>
                            <CreditCardIcon className="h-5 w-5 text-acc-color"/>
                        </div>
                        <p className='text-sm text-acc-color mt-2'>Debit</p>
                    </button> */}
                </div>
            </div>

            <div className='px-8 px-10 flex gap-2 pt-5'>
                <button type="button" className="text-acc-color bg-acc-btn hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Put on hold</button>
                <button type="button" className={`text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${productInCart ? 'cursor-not-allowed' : 'pointer'}`} onClick={() => proceedCart()} disabled={productInCart}>Proceed</button>
            </div>
        </div>
    );
}