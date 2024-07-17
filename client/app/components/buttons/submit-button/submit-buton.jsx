import React from 'react'

export default function Button({ text, onSignup, isDisabled, border }) {
  return (
      <div className="relative">
          <button onClick={onSignup} className={`w-full ${border ? 'border border-2 border-primary bg-[transparent] text-primary' : 'bg-primary text-white'} rounded-md py-2.5 px-5`} disabled={isDisabled}>{text}</button>
      </div>
  );
}
