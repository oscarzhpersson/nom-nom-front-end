import React, { useState } from 'react';

export default function Card({ children }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`cursor-pointer p-4 border rounded-md shadow-sm ${
        isSelected ? 'bg-stone-300' : 'bg-white'
      }`}
    >
      {children}
    </div>
  );
}
