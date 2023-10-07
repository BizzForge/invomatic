import React, {useState} from 'react'

export default function DatePicker({Icon, title, color}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDatePicker = () => {
      setIsOpen(!isOpen);
      console.log(isOpen)
    };
    return (
        <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none" onClick={toggleDatePicker}>
                <Icon strokeWidth={2} className={`w-6 h-6 text-white text-${color}`} />
            </div>
            <input datepicker type="text" className="bg-main-bg border border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={title} />
        </div>
    )
}
