"use client";
import {React, Fragment, useState, useEffect} from 'react'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import Button from '../components/buttons/submit-button/submit-buton';
import Session from '../tempates/session/session.jsx'
import InputWithIcon from '../components/inputs/input-with-icon/input-with-icon';
import AuthBtn from '../components/buttons/auth-button/auth-button.jsx';

export default function Login() {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleClick = () => {
    console.log('deni')
  }

  return (
    <Session>
      <div className="mb-3 mt-8">
        <h1 className="font-bold mb-3 mt-0 text-4xl">Welcome Back</h1>
        <p className="text-[16px] mb-4 text-acc-color">Don't have an account? <Link href="/signup" className="font-bold text-primary">Signup </Link></p>

        <Fragment>
          <div className="py-2">
            <InputWithIcon type="text" icon={<EnvelopeIcon className="h-5 w-5 text-primary" />} placeholder="Username or your@email.com" />
          </div>
          <div className="py-2">
              <InputWithIcon type="password" icon={<LockClosedIcon className="h-5 w-5 text-primary" />} placeholder="At least 8 characters long" />
          </div>
          <div className="w-full">
            <Link href="/login" className="pt-2 flex justify-end text-primary font-bold">Forgot Password</Link>
          </div>

          <div className="py-2">
              <Button text="Register" isDisabled={buttonDisabled}/>
          </div>

          <div className="py-2 items-center w-full flex">
            <div className="border-b border-acc-color w-4/5"></div> 
            <p className="p-3 text-acc-color text-[14px]">or</p>
            <div className="border-b border-acc-color w-4/5"></div>
          </div>

          <div className="w-full justify-between py2 flex">
            <AuthBtn icon="/images/7123025_logo_google_g_icon.svg" onClick={handleClick} text="Signin with Google" isFirst={true}/>
            <AuthBtn icon="/images/5296499_fb_facebook_facebook logo_icon.svg" onClick={handleClick} text="Signin with Facebook" isLast={true}/>
          </div>
        </Fragment>
      </div>
    </Session>
  )
}
