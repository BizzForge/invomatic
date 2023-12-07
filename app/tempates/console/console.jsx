'use client'
import Aside from '@/app/components/aside/aside'
import React, {Fragment, useState} from 'react'
import Modal from '../../components/modal/modal'
import InputWithoutIcon from '@/app/components/inputs/input-without-icon/input-without-icon';
import toast, { Toaster } from 'react-hot-toast';
import PaymentMethods from '@/app/components/payment-methods/payment-methods';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function Console({children}) {
  const [display, setDisplay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [tax, setTax ] = useState('');
  const [total, setTotal] = useState('');
  const [rem, setRem] = useState(0);
  const [altPayment, setAltPayment] = useState(false);
  const [paymentCheck, setPaymentCheck] = useState(false);
  const [receiptView, setReceiptView] = useState(false);
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');


  useState(()=>{
    const paymentMethod = e => {
      const method = e.detail.method;
      const display = e.detail.display;
      const subtotal = e.detail.subtotal;
      const tax = e.detail.tax;
      const total = e.detail.total;
      const products = e.detail.products;

      setDisplay(display);
      setPaymentMethod(method)
      setSubtotal(subtotal)
      setTax(tax);
      setTotal(total);
      setProducts(products);
    }

    window.addEventListener('paymentMethod', paymentMethod)
  }, [])

  const handleCloseModal = () => {
    setDisplay(false)
  }

  const orderComplete = () => {
    const cashInput = document.querySelector('#cash');
    const cashValue = cashInput.value.trim().toLocaleString();

    const convertTotal = total.replace(/,/g, '');
    const convertTotalToNumber = parseInt(convertTotal);

    setInputValue(cashValue);

    if(cashValue === ''){
      toast.error('Cash field cannot be empty');
    } else{
      if(cashInput.valueAsNumber === convertTotalToNumber){
        setPaymentCheck(true);
        setReceiptView(true);
      } else {
        if(cashInput.valueAsNumber > convertTotalToNumber){
          setAltPayment(false)
          let result = cashInput.valueAsNumber - convertTotalToNumber
          setRem(result);
          setPaymentCheck(true);
        }else{
          toast.error('Not enough cash');
          setPaymentCheck(false);
          setAltPayment(true)
        }
  
      }

    }

  }

  const confirmOrder = () => {
    setReceiptView(true);
  }

  const onPrint = () => {
    if (window && 'print' in window) {
      window.print();
    } else {
      toast.error('Printing is not supported in this browser.');
    }
  };

  return (
    <div className='bg-main-bg'>
      <Modal display={display} onClose={handleCloseModal}>
        {paymentMethod === 'cash' ? (
          <div>
            {receiptView ? (
              <Fragment>
                <h2 className='font-bold text-lg capitalize modal-title'>Receipt</h2>

                <div className='receipt text-xs w-full mx-auto p-3' id="receipt">
                  <div class="text-center mb-5">
                      <div class="text-xl font-bold uppercase">Receipt</div>
                      <div class="receipt-info">
                          Date: October 29, 2023<br />
                          Transaction ID: #123456
                      </div>
                  </div>

                  <div className="mb-4 border-dashed border-b-1 border-acc-color">
                    <div class="receipt-info">
                        Date: October 29, 2023<br />
                        Transaction ID: #123456
                    </div>
                  </div>

                  <Fragment>
                    <ul class="receipt-lists max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                      {products.map((product, index) => (
                      <li key={index} className='py-1 flex justify-between items-center'>
                          <div>
                            {console.log(product)}
                            <p>{product.payload.item?.productTitle}</p>
                            {product.payload.quantity} x Ksh {product.payload.item?.price}
                          </div>
                          <div>
                            <p>Ksh {product.payload.item?.updatedPrice ? product.payload.item?.updatedPrice : product.payload.item?.price}</p>
                          </div>
                      </li>
                      ))}
                    </ul>
                  </Fragment>

                  <div className='total flex justify-between items-center py-3 mt-4 border-dashed border-b-2 border-t-2 border-acc-color'>
                    <p className='text-acc-color text-2xl'>Total</p>
                    <p className='font-bold text-2xl'>Ksh. {total}</p>
                  </div>


                  <div className='py-3'>
                    <div className='payments flex py-1 justify-between items-center'>
                      <p className='font-bold capitalize'>{paymentMethod}:</p>
                      <p>ksh {inputValue}</p>
                    </div>
                    <div className='payments flex py-1 justify-between items-center'>
                      <p className='font-bold'>Paid amount:</p>
                      <p>ksh {total}</p>
                    </div>
                    {rem != 0 ? (
                    <div className='payments flex py-1 justify-between items-center'>
                      <p className='font-bold'>Change:</p>
                      <p>ksh {rem.toLocaleString()}</p>
                    </div>
                    ) : ''}
                  </div>

                  <div className='w-full mt-4'>
                    <center><p>*********************************************************</p></center>
                    <center><p className='py-1'><i>Thank you for shopping with us</i></p></center>
                    <center><p>*********************************************************</p></center>
                  </div>
                </div>
                {/* <div className='mt-4'>
                  <div className="flex items-center mb-4">
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Send receipt to the email</label>
                  </div>
                  <div className="flex items-center">
                      <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Print receipt</label>
                  </div>
                </div> */}

                <button type="button" onClick={onPrint} className="modal-btn w-full mt-4 text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Proceed</button>
              </Fragment>


            ) : (
              <Fragment>

                  <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
    
                  <div className="py-5">
                    <InputWithoutIcon id="cash" type="number" placeholder="Enter cash payed"/>
                  </div>
    
                  <div className='w-full pt-8 px-0 md:px-0 pb-10'>
                    <div className='flex justify-between items-center pb-3'>
                        <p className='text-acc-color'>Subtotal</p>
                        <p className='font-bold'>Ksh. {subtotal}</p>
                    </div>
                    <div className='flex justify-between pb-3 items-center border-dashed border-b-2 border-acc-color'>
                        <p className='text-acc-color'>Tax 16%</p>
                        <p className='font-bold'>Ksh. {tax}</p>
                    </div>
                    <div className='flex justify-between items-center pt-3'>
                        <p className='text-acc-color text-2xl'>Total</p>
                        <p className='font-bold text-2xl'>Ksh. {total}</p>
                    </div>
                  </div>
    
                  <div className='pb-8'>
                    <p><span className='font-bold'>Change: </span> Ksh. {rem}.</p>
                  </div>
    
                  {altPayment ? (
                    <Fragment>
                      <p className='font-bold'>Alternate payment method</p>
                      <div className="py-10 flex gap-3">
                          <button onClick={() => setMethod('mpesa')} className={`cursor-pointer text-center btn`}>
                              <div className={`p-4 bg-acc-btn rounded-lg hover:pl-color ${paymentMethod === 'mpesa' ? 'active' : ''}`}>
                                  <DevicePhoneMobileIcon className="h-5 w-5 text-acc-color"/>
                              </div>
                              <p className='text-sm text-acc-color mt-2'>Mpesa</p>
                          </button>
                      </div>
                    </Fragment>
    
                  ) : ('')}
    
                  {paymentCheck ? (
                    <button type="button" onClick={confirmOrder} className="w-full text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Complete Order</button>
    
                  ) : (
                    <button type="button" onClick={orderComplete} className="w-full text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Confirm Payment</button>
                  )}
                  <Toaster />
              </Fragment>
            )}
          </div>
        ) : paymentMethod === 'debit' ? (
            <div>
              <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
              <p className="text-acc-btn  mt-[30px]">{paymentMethod} coming soon</p>
            </div>
        ) : paymentMethod === 'mpesa' ? (
            <div>
              <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
              <p className="text-acc-btn mt-[30px]">{paymentMethod} coming soon</p>
            </div>
        ) : (
          <p>Unknown payment method</p>
        )}
      </Modal>
      <div className='block md:flex'>
        <Aside />

        <div className='w-full md:ml-16'>
          {children}
        </div>
      </div>
    </div>
  )
}
