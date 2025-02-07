import React from 'react';

import Navbar from '../components/navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
};

export const Basic = () => {
  const options = [
    'Oscar Persson',
    'Anthony Bassey',
    'E Joon Ko',
    'Robin Ellingsen',
  ];

  return <Navbar servers={options} />;
};
