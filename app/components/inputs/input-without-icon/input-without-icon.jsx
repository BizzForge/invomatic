export default  function InputWithoutIcon({ leftIcon, rightIcon, type, placeholder, id, onClick, isFirst, isLast, change }) {
    const containerClasses = `relative ${isFirst ? 'mr-2' : ''} ${isLast ? 'ml-2' : ''}`;

    return (
        <div className={containerClasses}>
            <input
                id={id}
                className="pl-5 pr-16 py-2.5 placeholder-pl-color bg-input-color rounded-md w-full"
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