import Image from "next/image";

export default function AuthBtn({ icon, text, onClick, isFirst, isLast }) {
    const containerClasses = `px-4 ${isFirst ? 'md:mr-2 md:mt-4 md:mb-4' : ''} ${isLast ? 'md:ml-2 md:mt-4 md:mb-4' : ''} w-full bg-acc-btn text-acc-color w-2/3 flex justify-center align-middle items-center py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300`
    return (
        <button
        className={containerClasses}
        onClick={onClick}
      >
        <span className="mr-2">
          <Image src={icon} alt="auth" width={26} height={26}/>
        </span>
        {text}
      </button>
    );
}