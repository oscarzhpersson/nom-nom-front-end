import Navbar from '@/components/navbar';

export default async function HomePage() {
  const options = [
    'Oscar Persson',
    'Anthony Bassey',
    'E Joon Ko',
    'Robin Ellingsen',
  ];

  return (
    <div>
      <Navbar servers={options} />
    </div>
  );
}
