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
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/forge/Users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration was successful, you can redirect the user or perform other actions
        // For example, you can redirect the user to the login page
        // Router.push('/login'); // Assuming you're using Next.js Router
        alert('user registered')
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Session>
      <div className="mb-3 mt-8">
        <h1 className="font-bold mb-3 mt-0 text-4xl">Welcome Back</h1>
        <p className="text-[16px] mb-4 text-acc-color">Don&apos;'t have an account? <Link href="/signup" className="font-bold text-primary">Signup </Link></p>

        <Fragment>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <InputWithIcon type="text" LeftIcon={<EnvelopeIcon className="h-5 w-5 text-primary" />} placeholder="Username or your@email.com" />
            </div>
            <div className="py-2">
                <InputWithIcon type="password" LeftIcon={<LockClosedIcon className="h-5 w-5 text-primary" />} placeholder="At least 8 characters long" />
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

            <div className="w-full justify-between py2 block md:flex">
              {/* <AuthBtn icon="/images/7123025_logo_google_g_icon.svg" onClick={handleClick} text="Signin with Google" isFirst={true}/>
              <AuthBtn icon="/images/5296499_fb_facebook_facebook logo_icon.svg" onClick={handleClick} text="Signin with Facebook" isLast={true}/> */}
            </div>
          </form>
        </Fragment>
      </div>
    </Session>
  )
}
