import React, { useState } from 'react';

export default function DatePicker({ LeftIcon, RightIcon, isFirst, isLast, placeholder, change, value }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          className="border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-400"
        />
        <span className="absolute top-1 right-2 text-gray-500 cursor-pointer">
          {/* You can use a calendar icon or any other icon here */}
          &#128197;
        </span>
      </div>
    );
}