"use client";
import React, { Fragment, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon, UserIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Session from '../tempates/session/session.jsx';
import Button from '../components/buttons/submit-button/submit-buton';
import InputWithIcon from '../components/inputs/input-with-icon/input-with-icon';
import AuthBtn from '../components/buttons/auth-button/auth-button.jsx';
import axiosInterceptorInstance from '@/axiosInterceptorInstance.js';


export default function Signup(title, subtitle) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        businessName: '',
        username: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    }

    const registrationApi = async () => {
        try {
            const response = await axios.post('http://localhost:5501/api/v1/add-user/', user);

            if (response.status === 201) {
              toast.success('Registration successful!');
            // You can handle redirection to the login page or any other action upon successful registration.
            } else {
              toast.error('Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Registration failed 2.');
        }
    }
    
    const handleSubmit = async () => {
      await registrationApi();
        // if (user.firstName && user.lastName && user.email && user.username && user.businessName && user.password) {
        //     setButtonDisabled(true);
        // } else {
        //     toast.error('Please fill in all fields.');
        // }
    }


    return (
        <Session>
        <div className="mb-3 mt-8">
          <h1 className="font-bold mb-3 mt-0 text-4xl">Get Started</h1>
          <p className="text-[16px] mb-4 text-acc-color">Already have an account? <Link href="/" className="font-bold text-primary">Sign in</Link></p>
  
          <Fragment>
            <div className="block md:flex">
              <div className="py-2">
                <InputWithIcon
                  type="text"
                  icon={<UserIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  placeholder="Your First Name"
                  isFirst={true}
                />
              </div>
              <div className="py-2">
                <InputWithIcon
                  type="text"
                  icon={<UserIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  placeholder="Your Last Name"
                  isLast={true}
                />
              </div>
            </div>
            <div className="block md:flex">
              <div className="py-2">
                <InputWithIcon
                  type="text"
                  icon={<EnvelopeIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="your@email.com"
                  isFirst={true}
                />
              </div>
              <div className="py-2">
                <InputWithIcon
                  type="text"
                  icon={<UserCircleIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Username"
                  isLast={true}
                />
              </div>
            </div>
            <div className="w-full">
              <InputWithIcon
                type="text"
                icon={<UserCircleIcon className="h-5 w-5 text-primary" />}
                onChange={(e) => setUser({ ...user, businessName: e.target.value })}
                placeholder="Business name"
                isLast={true}
              />
            </div>
            <div className='block md:flex'>
              <div className="py-2">
                <InputWithIcon
                  type="password"
                  icon={<LockClosedIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="At least 8 characters long"
                />
              </div>
              <div className="py-2">
                <InputWithIcon
                  type="password"
                  icon={<LockClosedIcon className="h-5 w-5 text-primary" />}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="confirm password"
                />
              </div>
            </div>
            <div className="w-full">
              <Link href="/" className="pt-2 flex justify-end text-primary font-bold">
                Forgot Password
              </Link>
            </div>
  
            <div className="py-2">
              <Button text="Register" onSignup={handleSubmit} disabled={buttonDisabled} />
              <Toaster />
            </div>
  
            <div className="py-2 items-center w-full flex">
              <div className="border-b w-4/5"></div>
              <p className="p-3">or</p>
              <div className="border-b w-4/5"></div>
            </div>
  
            <div className="w-full justify-between py-2 flex">
              <AuthBtn icon="/images/7123025_logo_google_g_icon.svg" text="Signup with Google" isFirst={true} />
              <AuthBtn icon="/images/5296499_fb_facebook_facebook logo_icon.svg" text="Signup with Facebook" isLast={true} />
            </div>
          </Fragment>
        </div>
      </Session>
    )
}
