"use client"

import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function addOrder(sessionId, guestId, item, quantity) {
    const orderPayload = {
        user_id: guestId,
        item_name: item.name,
        price: item.price,
        category: item.category,
        quantity: quantity,
        status: "pending"
    }

    const parentDocRef = doc(db, "sessions", sessionId);

    const subcollectionRef = collection(parentDocRef, "orders");

    await addDoc(subcollectionRef, orderPayload);
}
