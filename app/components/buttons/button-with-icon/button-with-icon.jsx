'use client'
import React from 'react'

export default function ButtonWithIcon({onClick, href, text, Icon}) {
    const isLink = !!href;
    const buttonStyles = `
        inline-flex items-center px-4 py-2 ${
        isLink
            ? "text-white bg-primary py-2.5 hover:text-blue-600 rounded-md"
            : "bg-primary border border-transparent py-2.5 rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        }
    `;
    return isLink ? (
        <a href={href} className={buttonStyles}>
          {text}
          <span className="ml-2">
            <Icon strokeWidth={2} className="w-6 h-6 text-white" />
          </span>
        </a>
      ) : (
        <button onClick={onClick} className={buttonStyles}>
          {text}
            <span className="ml-2">
                <Icon strokeWidth={2} className="w-6 h-6 text-acc-color" />
            </span>
        </button>
      );
}
