"use client"
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';
import {addOrder} from "@/api/add-order"

export default function TestPage() {

    return (
        <button onClick={() => addOrder("aknwD1l2q2z0ekl8ZSS9", "3", {name: "lol", price: 4, category: "hue"}, 2)}>Add</button>
    );
}
