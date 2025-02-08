"use client"

import { getFirestore, doc, collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
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

    const q = query(
        subcollectionRef,
        where("user_id", "==", guestId),
        where("item_name", "==", item.name),
        where("status", "==", "pending")
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
            const existingOrder = docSnapshot.data();
            const newQuantity = existingOrder.quantity + quantity;

            await updateDoc(docSnapshot.ref, { quantity: newQuantity });
        });
    } else {
        await addDoc(subcollectionRef, orderPayload);
    }
}