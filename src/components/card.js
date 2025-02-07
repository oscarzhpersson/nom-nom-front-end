import React from 'react';

export default function Card({ children, onSelect, selected, className }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-4 border rounded-md shadow-sm ${className} ${
        selected ? 'bg-stone-300' : 'bg-white'
      }`}
    >
      {children}
    </div>
  );
}
