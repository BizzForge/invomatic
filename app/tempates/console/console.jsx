'use client'
import Aside from '@/app/components/aside/aside'
import React, {useState} from 'react'
import Modal from '../../components/modal/modal'
import InputWithoutIcon from '@/app/components/inputs/input-without-icon/input-without-icon';

export default function Console({children}) {
  const [display, setDisplay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [tax, setTax ] = useState('');
  const [total, setTotal] = useState('');
  const [rem, setRem] = useState(0);


  useState(()=>{
    const paymentMethod = e => {
      const method = e.detail.method;
      const display = e.detail.display;
      const subtotal = e.detail.subtotal;
      const tax = e.detail.tax;
      const total = e.detail.total;

      setDisplay(display);
      setPaymentMethod(method)
      setSubtotal(subtotal)
      setTax(tax);
      setTotal(total)
    }

    window.addEventListener('paymentMethod', paymentMethod)
  }, [])

  const handleCloseModal = () => {
    setDisplay(false)
  }

  const orderComplete = () => {
    const cashInput = document.querySelector('#cash');

    const convertTotal = total.replace(/,/g, '');
    const convertTotalToNumber = parseInt(convertTotal);

    if(cashInput.valueAsNumber === convertTotalToNumber){
      console.log(true);
    } else {
      if(cashInput.valueAsNumber > convertTotalToNumber){
        let result = cashInput.valueAsNumber - convertTotalToNumber
        setRem(result);
        console.log(rem, result)
      }else{
        console.log('not enough cash')
        // setChange(convertTotalToNumber - cashInput.valueAsNumber);
      }

      console.log(rem)
    }
  }

  return (
    <div className='bg-main-bg'>
      <Modal display={display} onClose={handleCloseModal}>
        {paymentMethod === 'cash' ? (
          <div>
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

            <button type="button" onClick={orderComplete} className="w-full text-white bg-primary hover:bg-blue-800 w-1/2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Complete Order</button>
          </div>
        ) : paymentMethod === 'debit' ? (
            <div>
              <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
              <p class="text-acc-btn  mt-[30px]">{paymentMethod} coming soon</p>
            </div>
        ) : paymentMethod === 'mpesa' ? (
            <div>
              <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
              <p class="text-acc-btn mt-[30px]">{paymentMethod} coming soon</p>
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
