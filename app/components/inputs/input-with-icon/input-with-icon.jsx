export default  function InputWithIcon({ leftIcon, rightIcon, type, placeholder, onClick, isFirst, isLast, change }) {
    const containerClasses = `relative ${isFirst ? 'mr-0 md:mr-2' : ''} ${isLast ? 'ml-0 md:ml-2' : ''}`;

    return (
        <div className={containerClasses}>
            <span className="absolute p-2 bg-white rounded-lg left-3 top-1/2 transform -translate-y-1/2">
                {leftIcon}
            </span>
            <input
                className="pl-16 pr-16 py-2.5 placeholder-pl-color bg-input-color rounded-md w-full"
                type={type}
                placeholder={placeholder}
                onChange={change}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {rightIcon && (
                <button onClick={onClick} className="focus:outline-none">
                    {rightIcon}
                </button>
                )}
            </div>
            
        </div>
    );
}