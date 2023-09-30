"use client";
import React, { Fragment, useState } from 'react';
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon, UserIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Session from '../tempates/session/session.jsx';
import Button from '../components/buttons/submit-button/submit-buton';
import InputWithIcon from '../components/inputs/input-with-icon/input-with-icon';
import AuthBtn from '../components/buttons/auth-button/auth-button.jsx';

export default function Signup(title, subtitle) {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleClick = () => {
        console.log('deni')
    }
    return (
        <Session>
            <div className="mb-3 mt-8">
                <h1 className="font-bold mb-3 mt-0 text-4xl">Get Started</h1>
                <p className="text-[16px] mb-4 text-acc-color">Already Have an account? <Link href="/" className="font-bold text-primary">Sigin </Link></p>

                <Fragment>
                    <div className="block md:flex">
                        <div className="py-2">
                            <InputWithIcon type="text" icon={<UserIcon className="h-5 w-5 text-primary" />} change={e => setUser({...user, firstName: e.target.value})} placeholder="Your First Name" isFirst={true}/>
                        </div>
                        <div className="py-2">
                            <InputWithIcon type="text" icon={<UserIcon className="h-5 w-5 text-primary" />} change={e => setUser({...user, lastName: e.target.value})} placeholder="Your Last Name" isLast={true}/>
                        </div>
                    </div>
                    <div className="block md:flex">
                        <div className="py-2">
                            <InputWithIcon type="text" icon={<EnvelopeIcon className="h-5 w-5 text-primary" />} change={e => setUser({...user, email: e.target.value})} placeholder="your@email.com" isFirst={true}/>
                        </div>
                        <div className="py-2">
                            <InputWithIcon type="text" icon={<UserCircleIcon className="h-5 w-5 text-primary" />} change={e => setUser({...user, username: e.target.value})} placeholder="Username" isLast={true}/>
                        </div>
                    </div>
                    <div className="py-2">
                        <InputWithIcon type="password" icon={<LockClosedIcon className="h-5 w-5 text-primary" />} change={e => setUser({...user, password: e.target.value})} placeholder="At least 8 characters long" />
                    </div>
                    <div className="w-full">
                        <Link href="/" className="pt-2 flex justify-end text-primary font-bold">Forgot Password</Link>
                    </div>

                    <div className="py-2">
                        <Button text="Register"/>
                    </div>

                    <div className="py-2 items-center w-full flex">
                        <div className="border-b w-4/5"></div> 
                        <p className="p-3">or</p>
                        <div className="border-b w-4/5"></div>
                    </div>

                    <div className="w-full justify-between py2 flex">
                        <AuthBtn icon="/images/7123025_logo_google_g_icon.svg" onClick={handleClick} text="Signup with Google" isFirst={true}/>
                        <AuthBtn icon="/images/5296499_fb_facebook_facebook logo_icon.svg" onClick={handleClick} text="Signup with Facebook" isLast={true}/>
                    </div>
                </Fragment>
            </div>
        </Session>
    )
}
