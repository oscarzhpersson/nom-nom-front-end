'use client';

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

import Navbar from '@/components/navbar';
import Dropdown from '@/components/dropdown';
import TableCard from '@/components/defined/table-card';
import GuestCard from '@/components/defined/guest-card';

export default function HomePage() {
  const [dataList, setDataList] = useState([]);
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, 'sessions'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setDataList(data);
    };

    fetchSessions();

    // Generate random tables and guests only on the client
    setTables(
      Array.from({ length: 12 }, (_, index) => ({
        tableNumber: 500 + index,
        time: Math.floor(Math.random() * 23) + 1 + ':00',
        size: Math.floor(Math.random() * 10) + 1,
      }))
    );

    setGuests(
      Array.from({ length: 12 }, (_, index) => ({
        guestId: 100 + index,
        name: 'Guest ' + (100 + index),
        total: Math.floor(Math.random() * 100000) + 10000,
      }))
    );
  }, []);

  const servers = [
    'Oscar Persson',
    'Anthony Bassey',
    'E Joon Ko',
    'Robin Ellingsen',
  ];

  const options = [
    'filter1',
    'filter2',
    'filter3',
    'filter4',
    'filter5',
    'filter6',
  ];

  return (
    <div className="flex flex-col">
      <Navbar servers={servers} />
      <div className="flex flex-row">
        <div className="flex w-1/5 h-screen overflow-y-scroll pb-24 p-6 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
          <h2 className="text-lg font-semibold text-black">Tables</h2>
          <Dropdown options={options} />
          {tables.map((table) => (
            <TableCard
              key={table.tableNumber}
              tableNumber={table.tableNumber}
              time={table.time}
              size={table.size}
              onSelect={() =>
                setSelectedTable(selectedTable === table ? null : table)
              }
              selected={selectedTable === table}
            />
          ))}
        </div>
        <div className="flex w-2/6 h-screen overflow-y-scroll bg-[#F7F7F7] pb-24 p-6 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
          <h2 className="text-lg font-semibold text-black">Guests</h2>
          <div className="flex flex-row flex-wrap space-12">
            {guests.map((guest) => (
              <GuestCard
                className="w-72 m-2"
                key={guest.guestId}
                guestId={guest.guestId}
                name={guest.name}
                total={guest.total}
                onSelect={() =>
                  setSelectedGuest(selectedGuest === guest ? null : guest)
                }
                selected={selectedGuest === guest}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
