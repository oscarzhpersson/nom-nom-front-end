"use client"

import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';

const db = getFirestore(firebaseApp);

export async function closeSession(sessionId) {
    try {
        const sessionDocRef = doc(db, "sessions", sessionId);

        await updateDoc(sessionDocRef, { closed: true });
    } catch (error) {
        console.error("Error closing session: ", error);
    }
}