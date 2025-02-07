import React from 'react';

import Navbar from '@/components/navbar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';
import Dropdown from '@/components/dropdown';
import TableCard from '@/components/defined/table-card';

export default async function HomePage() {
  const servers = [
    'Oscar Persson',
    'Anthony Bassey',
    'E Joon Ko',
    'Robin Ellingsen',
  ];

  const db = getFirestore(firebaseApp);
  const querySnapshot = await getDocs(collection(db, 'sessions'));
  const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(dataList)

  const options = [
    'filter1',
    'filter2',
    'filter3',
    'filter4',
    'filter5',
    'filter6',
  ];

  const tables = Array.from({ length: 12 }, (_, index) => ({
    tableNumber: 500 + index,
    time: Math.floor(Math.random() * 23) + 1 + ':00',
    size: Math.floor(Math.random() * 10) + 1,
  }));

  return (
    <div className="flex flex-col">
      <Navbar servers={servers} />
      <div className="flex w-1/4 h-screen overflow-y-scroll p-6 pt-24 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
        <h2 className="text-lg font-semibold text-black">Tables</h2>
        <Dropdown options={options} />
        {tables.map((table) => (
          <TableCard
            key={table.tableNumber}
            tableNumber={table.tableNumber}
            time={table.time}
            size={table.size}
          />
        ))}
      </div>
    </div>
  );
}
