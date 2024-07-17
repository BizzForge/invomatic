import { BanknotesIcon } from '@heroicons/react/24/outline';


export default function PaymentMethods(title, method, event, Icon){
    <button onClick={event} className="cursor-pointer text-center btn">
        <div className={`p-4 bg-acc-btn rounded-lg  hover:pl-color ${method === 'cash' ? 'active' : ''}`}>
            <Icon className="h-5 w-5 text-acc-color"/>
        </div>
        <p className='text-sm text-acc-color mt-2'>{title}</p>
    </button>
}