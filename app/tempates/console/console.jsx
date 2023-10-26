'use client'
import Aside from '@/app/components/aside/aside'
import React, {useState} from 'react'
import Modal from '../../components/modal/modal'

export default function Console({children}) {
  const [display, setDisplay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useState(()=>{
    const paymentMethod = e => {
      const method = e.detail.method;
      const display = e.detail.display;
      setDisplay(display);
      setPaymentMethod(method)
      console.log(`method: ${method}`)
    }

    window.addEventListener('paymentMethod', paymentMethod)
  }, [])

  const handleCloseModal = () => {
    setDisplay(false)
  }

  return (
    <div className='bg-main-bg'>
      <Modal display={display} onClose={handleCloseModal}>
        {paymentMethod === 'cash' ? (
          <div>
            <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
          </div>
        ) : paymentMethod === 'debit' ? (
            <div>
              <h2 className='font-bold text-lg capitalize'>{paymentMethod} payment</h2>
            </div>
        ) : paymentMethod === 'mpesa' ? (
          <p>Payment method is mpesa</p>
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
