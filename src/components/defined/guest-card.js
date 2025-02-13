'use client';
import React from 'react';

import Card from '@/components/card';

import formatCurrency from '@/utils/formatCurrency';

export default function GuestCard({
  total,
  paid,
  className,
  onSelect,
  selected,
  orders,
  guest
}) {
  return (
    <Card className={className} onSelect={onSelect} selected={selected}>
      <p className="font-light text-sm mb-1 text-[#64748B]">
        {'Guest ID: ' + guest?.id}
      </p>
      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${guest.active ? "bg-green-500": "bg-red-500"}`}></div>
      <h2 className="font-thin text-2xl text-black">{guest?.name}</h2>
      <div className="flex flex-row items-center text-[#64748B] mt-8 space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-cash"
          viewBox="0 0 16 16"
        >
          <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
        </svg>
        <span className="font-extralight text-xl">{formatCurrency(total)}</span>
      </div>
    </Card>
  );
}
