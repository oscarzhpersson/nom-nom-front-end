import React from 'react';

import Card from '@/components/card';
import TableCard from '@/components/defined/table-card';
import GuestCard from '@/components/defined/guest-card';

export default {
  title: 'Components/SelectableCard',
  component: Card,
};

export const Default = () => (
  <div className="flex flex-col space-y-12">
    <TableCard tableNumber={512} time="20:00" size={5} />
    <GuestCard name="John Doe" guestId="1234567890" total={4501.69} paid={50} />
  </div>
);
