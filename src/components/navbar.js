'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Dropdown from './dropdown';

import getInitials from '@/utils/getInitials';

export default function Navbar({ servers }) {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <nav className="w-full flex flex-row px-8 items-center justify-between p-3 shadow-sm bg-white z-50">
      <div className="flex flex-row items-center space-x-10 font-extralight text-black">
        <div className="flex flex-row items-center space-x-4">
          <Image src="/nomnom.png" alt="Nom-nom Logo" width={50} height={50} />
          <Dropdown
            options={servers}
            selected={selectedServer}
            onChange={setSelectedServer}
          />
        </div>

        <a className="font-medium" href="/home">
          Tables
        </a>
        <a href="/receipts">Receipts</a>
      </div>
      <div className="flex items-center space-x-10">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Table/Customer/Food"
          className="px-4 py-2 border rounded-md shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-black">
          {getInitials(selectedServer)}
        </div>
      </div>
    </nav>
  );
}
