'use client';

import React, { useState } from 'react';

export default function Dropdown({
  options = [],
  onChange = () => {},
  selected = '',
}) {
  const [currentOption, setCurrentOption] = useState(
    selected || (options.length > 0 ? options[0] : '')
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setCurrentOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-extralight text-black px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{currentOption || 'Select an option'}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-30 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <a
                href="#"
                className="block px-4 py-2 text-black font-extralight hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option);
                }}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
