'use client';
import { FunnelIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useState } from 'react'

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFilter = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div onClick={toggleFilter} className='p-4 bg-white rounded-lg cursor-pointer flex items-center justify-between trasition transition-all ease-in-out'>
            <span className='text-acc-color mr-3'>Filter</span>
            <span className="bg-white rounded-lg">
                <FunnelIcon className="h-5 w-5 text-acc-color"/>
            </span>

            {isOpen ? (
            <div className='p-5 bg-white md:w-1/3 absolute top-16 shadow-lg right-0 rounded-lg'>
                <p className='font-bold mb-5'>By Date</p>
                <div className='flex flex-wrap -mx-4'>
                    <div className='w-1/2 px-4'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                This Week
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2 px-4 mb-3'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                Last Week
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2 px-4 mb-3'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                This Month
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2 px-4 mb-3'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                Last Month
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2 px-4 mb-3'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                This Year
                            </label>
                        </div>
                    </div>
                    <div className='w-1/2 px-4 mb-3'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                Last Year
                            </label>
                        </div>
                    </div>
                </div>
                <hr className='h-px my-8 bg-acc-color border-0'/>
                <Fragment>
                    <div className='w-1/2'>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label
                                htmlFor="myCheckbox"
                                className="ml-2 text-acc-color cursor-pointer"
                            >
                                Date Range
                            </label>
                        </div>
                    </div>
                </Fragment>
            </div>
            ) : ('')}
        </div>
    )
}
