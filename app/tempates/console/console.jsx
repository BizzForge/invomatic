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
    const cashValue = cashInput.value.trim();

    const convertTotal = total.replace(/,/g, '');
    const convertTotalToNumber = parseInt(convertTotal);

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
                <h2 className='font-bold text-lg capitalize'>Receipt</h2>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="text-left">Product Title</th>
                      <th className="text-left">Original</th>
                      <th className="text-left">Qty</th>
                      <th className="text-left">final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td className="text-sm text-gray-500 font-bold truncate">{product.productTitle}</td>
                        <td className="text-sm text-acc-color truncate">
                          Ksh {product.price.toLocaleString()}
                        </td>
                        <td>{product.quantity.toLocaleString()}</td>
                        <td className="text-acc-color">
                          Ksh. {product.updatedPrice ? product.updatedPrice.toLocaleString() : product.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className='py-2'><span className='font-bold'>Change</span> {rem}</p>

                <div className='flex justify-between items-center py-3 mt-4 border-dashed border-b-2 border-t-2 border-acc-color'>
                  <p className='text-acc-color text-2xl'>Total</p>
                  <p className='font-bold text-2xl'>Ksh. {total}</p>
                </div>

                <p className='py-2 text-acc-btn'>Payed Via {paymentMethod}</p>

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

                <button type="button" onClick={onPrint} className="w-full mt-4 text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Proceed</button>
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
