'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { addOrder } from '@/api/add-order';
import { closeSession } from '@/api/close-session';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

import firebaseApp from '@/lib/firebase';

import Navbar from '@/components/navbar';
import Dropdown from '@/components/dropdown';
import TableCard from '@/components/defined/table-card';
import GuestCard from '@/components/defined/guest-card';
import formatCurrency from '@/utils/formatCurrency';
import ItemCard from '@/components/defined/item-card';

const db = getFirestore(firebaseApp);

export default function HomePage() {
  const [sessions, setSessions] = useState([]);
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

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

  const fetchData = async () => {
    try {
      const [sessionsSnapshot, tablesSnapshot, itemsSnapshot] =
        await Promise.all([
          getDocs(collection(db, 'sessions')),
          getDocs(collection(db, 'tables')),
          getDocs(collection(db, 'items')),
        ]);

      const sessionsData = sessionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const tablesData = tablesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSessions(sessionsData);
      setTables(tablesData);
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchOrders = async (sessionId) => {
    if (!sessionId) {
      setSelectedOrders(null);
      return [];
    }

    const ordersCollectionRef = collection(db, 'sessions', sessionId, 'orders');
    const querySnapshot = await getDocs(ordersCollectionRef);
    const ordersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setSelectedOrders(ordersData);
  };

  useEffect(() => {
    const fetchDataWithPolling = async () => {
      await fetchData();
    };

    fetchDataWithPolling();

    const intervalId = setInterval(fetchDataWithPolling, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const selectedSession = getSessionFromTable(selectedTable, sessions);
    setSelectedSession(selectedSession);
    fetchOrders(selectedSession?.id);
    setGuests(guestsToList(selectedSession?.users ?? {}));
  }, [sessions, selectedTable]);

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
              time="60 minutes"
              size={guestsToList(getSessionFromTable(table, sessions)?.users ?? {}).length}
              onSelect={() =>
                setSelectedTable(selectedTable === table ? null : table)
              }
              selected={selectedTable?.id === table?.id}
            />
          )}
          options={options}
        />
        <MainContent
          guests={guests}
          selectedGuest={selectedGuest}
          setSelectedGuest={setSelectedGuest}
          selectedOrders={selectedOrders}
          selectedSession={selectedSession}
        />
        <GuestDetails
          sessions={selectedSession}
          selectedGuest={selectedGuest}
          items={items}
          selectedOrders={selectedOrders}
          refreshOrders={fetchOrders}
        />
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

function MainContent({
  guests,
  selectedGuest,
  setSelectedGuest,
  selectedOrders,
  selectedSession,
}) {
  return (
    <div className="flex w-6/12 overflow-y-scroll bg-[#F7F7F7] flex-col space-y-6 border-r border-gray-200 hide-scrollbar justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg p-6 font-semibold text-black">Guests</h2>
        <div className="flex flex-row px-6 flex-wrap space-12">
          {guests?.map((guest) => (
            <GuestCard
              className="w-72 m-2"
              key={guest.id}
              total={getTotalFromGuest(guest, selectedOrders) ?? 0}
              onSelect={() =>
                setSelectedGuest(selectedGuest?.id === guest?.id ? null : guest)
              }
              selected={selectedGuest?.id === guest?.id}
              orders={selectedOrders?.filter(
                (order) => order.user_id === guest.id
              )}
              guest={guest}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col pb-20">
        {selectedOrders && (
          <TableOverview
            selectedOrders={selectedOrders}
            totalPaid={getTotalPaidFromGuests(guests.filter((order) => order?.status === "paid"))}
            totalTable={getTotalFromOrders(selectedOrders)}
          />
        )}
        <button disabled={!selectedSession} className="bg-black text-white p-4 my-8 mx-6 rounded-md" onClick={() => closeSession(selectedSession?.id)}>
          Finish Session
        </button>
      </div>
    </div>
  );
}

function TableOverview({ selectedOrders, totalPaid, totalTable }) {
  const totalOrder = selectedOrders ? getTotalFromOrders(selectedOrders.filter((order) => order?.status === "paid")) : 0;
  const totalTip = Math.max(totalPaid ? totalPaid - totalOrder : 0, 0)
  return (
    <div className="flex flex-col border-t border-gray-200 space-12 bg-[#F7F7F7]">
      <h2 className="text-lg font-semibold p-6 text-black">Table Overview</h2>
      <div className="flex flex-row">
        <OverviewItem label="Paid" amount={totalOrder} />
        <OverviewItem
          label="Tip"
          amount={totalTip}
        />
        <OverviewItem
          label="Total"
          amount={totalTable ? totalTable + totalTip : totalOrder}
        />
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

function GuestDetails({
  sessions,
  selectedGuest,
  items,
  selectedOrders,
  refreshOrders,
}) {
  const guestOrders =
    selectedGuest && selectedOrders
      ? selectedOrders.filter(
          (order) => String(order.user_id) === String(selectedGuest.id)
        )
      : [];

  const handleIncrement = async (item) => {
    try {
      await addOrder(sessions.id, selectedGuest.id, item, 1);
      if (refreshOrders) {
        refreshOrders(sessions.id);
      }
    } catch (error) {
      console.error('Error incrementing order:', error);
    }
  };

  const handleDecrement = async (item) => {
    try {
      await addOrder(sessions.id, selectedGuest.id, item, -1);
      if (refreshOrders) {
        refreshOrders(sessions.id);
      }
    } catch (error) {
      console.error('Error decrementing order:', error);
    }
  };

  return (
    <div className="flex w-4/12 h-screen overflow-y-scroll pb-24 p-6 flex-col space-y-6 border-r border-gray-200 hide-scrollbar">
      <h2 className="text-lg font-semibold text-black">
        {selectedGuest?.name || 'Guest Details'}
      </h2>
      <motion.div layout className="flex flex-col gap-4">
        {items
          .map((item) => {
            const matchingOrder = guestOrders.find(
              (order) =>
                String(order.item_name).toLowerCase() ===
                String(item.name).toLowerCase()
            );
            return {
              ...item,
              orderQuantity: matchingOrder ? matchingOrder.quantity : 0,
            };
          })
          .sort((a, b) => b.orderQuantity - a.orderQuantity)
          .map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ItemCard
                name={item.name}
                price={item.price}
                description={item.description}
                quantity={item.orderQuantity}
                selectedGuest={selectedGuest}
                onIncrement={() => handleIncrement(item)}
                onDecrement={() => handleDecrement(item)}
              />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

function getSessionFromTable(table, sessions) {
  const session = sessions?.find(
    (session) => table?.id === session?.table_id && session?.closed === false
  );
  return session ?? null;
}

function getTotalFromOrders(orders) {
  return orders?.reduce((sum, order) => {
    return sum + order.price * order.quantity;
  }, 0);
}

function getTotalPaidFromGuests(guests) {
  return guests?.reduce((sum, guest) => {
    return sum + (guest?.pre_payment_amount ?? 0);
  }, 0);
}

function getTotalFromGuest(guest, orders) {
  const guestOrders = orders?.filter((order) => order.user_id === guest.id);

  return getTotalFromOrders(guestOrders);
}

function guestsToList(guests) {
  return Object.entries(guests).map(([key, value]) => {
    return { id: key, ...value };
  });
}
