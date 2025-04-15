/*import { db } from "../_utils/firebase";
import { collection, getDoc, addDoc, setDoc, deleteDoc, docRef, query, doc } from "firebase/firestore";

export const newUser = async (userId, username) => {
    try {
        await setDoc(doc(db, "users", userId), {
            name: username
        });
    }
    catch(e){
        console.error(e);
    }
}

export const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap;
    }
    catch(e){
        console.error(e);
    }
}

This file is useless; Firebase can store usernames within auth.currentuser*/