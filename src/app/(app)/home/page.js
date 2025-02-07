'use client';

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

import Navbar from '@/components/navbar';
import Dropdown from '@/components/dropdown';
import TableCard from '@/components/defined/table-card';
import GuestCard from '@/components/defined/guest-card';
import formatCurrency from '@/utils/formatCurrency';

const db = getFirestore(firebaseApp);

export default function HomePage() {
  const [sessions, setSessions] = useState([]);
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    fetchSessions();
    fetchTables();
    initializeGuests();
  }, []);

  const fetchSessions = async () => {
    const querySnapshot = await getDocs(collection(db, 'sessions'));
    const sessionsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSessions(sessionsData);
  };

  const fetchTables = async () => {
    const querySnapshot = await getDocs(collection(db, 'tables'));
    const tablesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTables(tablesData);
  };

  const initializeGuests = () => {
    setGuests(
      Array.from({ length: 12 }, (_, index) => ({
        guestId: 100 + index,
        name: `Guest ${100 + index}`,
        total: Math.floor(Math.random() * 100000) + 10000,
      }))
    );
  };

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
        <Sidebar
          title="Tables"
          items={tables}
          renderItem={(table) => (
            <TableCard
              key={table.id}
              tableNumber={table.id}
              time={"60 minutes"}
              size={Object.keys(getSessionFromTable(table, sessions)?.users ?? {}).length}
              onSelect={() =>
                setSelectedTable(selectedTable === table ? null : table)
              }
              selected={selectedTable === table}
            />
          )}
          options={options}
        />
        <MainContent
          guests={guests}
          selectedGuest={selectedGuest}
          setSelectedGuest={setSelectedGuest}
        />
        <GuestDetails selectedGuest={selectedGuest} />
      </div>
    </div>
  );
}

function Sidebar({ title, items, renderItem, options }) {
  return (
    <div className="flex w-2/12 h-screen overflow-y-scroll pb-24 p-6 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <Dropdown options={options} />
      {items.map(renderItem)}
    </div>
  );
}

function MainContent({ guests, selectedGuest, setSelectedGuest }) {
  return (
    <div className="flex w-6/12 h-screen overflow-y-scroll justify-between bg-[#F7F7F7] flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
      <h2 className="text-lg p-6 font-semibold text-black">Guests</h2>
      <div className="flex flex-row px-6 flex-wrap space-12">
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
      <TableOverview />
    </div>
  );
}

function TableOverview() {
  return (
    <div className="flex flex-col border-t border-gray-200 h-full flex-wrap space-12 bg-[#F7F7F7]">
      <h2 className="text-lg font-semibold p-6 text-black">Table Overview</h2>
      <div className="flex flex-row">
        <OverviewItem label="Paid" amount={45261.89} />
        <OverviewItem label="Tip" amount={26.0} />
        <OverviewItem label="Total" amount={52560.9} />
      </div>
    </div>
  );
}

function OverviewItem({ label, amount }) {
  return (
    <div className="flex flex-col text-black px-6 py-2">
      <p className="text-xs">{label}</p>
      <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
    </div>
  );
}

function GuestDetails({ selectedGuest }) {
  return (
    <div className="flex w-4/12 h-screen overflow-y-scroll pb-24 p-6 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
      <h2 className="text-lg font-semibold text-black">
        {selectedGuest?.name}
      </h2>
      <div className="flex flex-row flex-wrap space-12"></div>
    </div>
  );
}

function getSessionFromTable(table, sessions) {
  const session = sessions?.find(
    (session) => table?.id === session?.table_id && session?.closed === false
  );
  return session ?? null;
}