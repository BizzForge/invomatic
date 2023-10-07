import React, {useState} from 'react'

export default function DatePicker({Icon, title, color}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const minDate = '2023-01-01'; // Set your min date here
    const maxDate = '2023-12-31'; // Set your max date here
  
    const toggleDatePicker = () => {
      setIsOpen(!isOpen);
    };
  
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
      toggleDatePicker();
    };
  
    return (
      <div className="relative">
        <div className="relative mt-2">
          <input
            id="date"
            type="date"
            className="p-2 px-10 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={selectedDate || ''}
            onChange={handleDateChange}
            onFocus={toggleDatePicker}
            onBlur={toggleDatePicker}
            placeholder="YYYY-MM-DD"
            min={minDate}
            max={maxDate}
          />
          {isOpen && (
            <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded-md shadow-md mt-1">
              {/* Your custom date picker content here */}
              {/* For simplicity, let's just display a static calendar */}
              <div className="p-2">
                <div className="grid grid-cols-7 gap-1">
                  {/* ... Calendar days ... */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
