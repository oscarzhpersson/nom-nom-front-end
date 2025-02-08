'use client';
import React from 'react';

import Card from '@/components/card';

import formatCurrency from '@/utils/formatCurrency';

export default function ItemCard({
  name,
  price,
  description,
  image,
  quantity,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <Card>
          <h2 className="text-lg font-semibold text-black">{name}</h2>
          <div className="flex flex-row justify-between items-center">
            <p>{formatCurrency(price)}</p>
            <div className="flex flex-row justify-center items-center space-x-4">
              <button className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-dash"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
              </button>
              <span className="text-black text-xl">{quantity}</span>
              <button className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
