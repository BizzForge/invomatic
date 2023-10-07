import React from 'react'

export default function Button({ text, onSignup, isDisabled }) {
  return (
      <div className="relative">
          <button onClick={onSignup} className="w-full bg-primary rounded-md py-2.5 px-5 text-white" disabled={isDisabled}>{text}</button>
      </div>
  );
}
