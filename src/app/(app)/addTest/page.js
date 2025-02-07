"use client"
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

export default function TestPage() {
    const newOrder = {
        user_id: '4',
        item_name: 'Coffee',
        price: 3.5,
        quantity: 2,
        status: 'pending'
    };

    const db = getFirestore(firebaseApp);

    async function addOrder(sessionId, orderData) {
        const parentDocRef = doc(db, "sessions", sessionId);

        const subcollectionRef = collection(parentDocRef, "orders");

        await addDoc(subcollectionRef, orderData);
    }

    return (
        <button onClick={() => addOrder("8QvR9h7Lv2pgzYXB0Q13", newOrder)}>Add</button>
    );
}
