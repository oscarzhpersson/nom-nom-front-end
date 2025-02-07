"use client"
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

export default function TestPage() {
    const newOrder = {
        user_id: '4',
        item_name: 'Pizza',
        price: 5,
        quantity: 4,
        status: 'pending'
    };

    const db = getFirestore(firebaseApp);

    async function addOrder(sessionId, orderData) {
        const parentDocRef = doc(db, "sessions", sessionId);

        const subcollectionRef = collection(parentDocRef, "orders");

        await addDoc(subcollectionRef, orderData);
    }

    return (
        <button onClick={() => addOrder("aknwD1l2q2z0ekl8ZSS9", newOrder)}>Add</button>
    );
}
