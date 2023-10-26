import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';

export default function Modal({ children, display, onClose}) {
    const closeModal = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={`w-full absolute z-50 ${display ? 'block' : 'hidden'}`}>
            <div className="glass-blur w-full bg-[#000]/50 absolute h-screen z-40 overflow-hidden" onClick={() => closeModal()}></div>
            <div className={`bg-white p-10 z-50 relative max-w-md h-screen overflow-hidden transition-transform duration-300 ease-in-out ${display ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className='absolute top-[40px] right-[25px] bg-acc-btn rounded-full p-1' onClick={() => closeModal()}>
                    <XMarkIcon className="h-5 w-5 text-acc-color"/>
                </button>
                {children}
            </div>
        </div>
    );
}