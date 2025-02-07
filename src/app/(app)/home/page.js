import Navbar from '@/components/navbar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

export default async function HomePage() {
  const options = [
    'Oscar Persson',
    'Anthony Bassey',
    'E Joon Ko',
    'Robin Ellingsen',
  ];

  const db = getFirestore(firebaseApp);

  const querySnapshot = await getDocs(collection(db, 'sessions'));
  const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(dataList)

  return (
    <div>
      <Navbar servers={options} />
    </div>
  );
}
