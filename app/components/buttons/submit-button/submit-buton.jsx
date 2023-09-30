import React from 'react'

export default function Button({ text, onSignup, isDisabled }) {
  return (
      <div className="relative">
          <button onClick={onSignup} className="w-full bg-primary rounded-md py-2.5 mt-6 text-white" disabled={isDisabled}>{text}</button>
      </div>
  );
}
