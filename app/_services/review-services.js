import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, setDoc, deleteDoc, docRef, query, where, orderBy, doc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export const newReview = async (id, rating, title, seriesName, text) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const username = user.displayName;
    const currentPfp = user.photoURL;

    try {

        const reviewRef = doc(collection(db, "reviews"));

        await setDoc(reviewRef, {
            reviewId: reviewRef.id,
            seriesId: id,
            userId: user.uid,
            image: currentPfp,
            seriesName : seriesName,
            username: username,
            rating: rating,
            title: title,
            text: text,
            createdTime: serverTimestamp()
        });
    }
    catch(e){
        console.error(e);
    }
}

export const getReviews = async (id) => {
    try {
        let q;
        if (id.length > 10) {
            q = query(
                collection(db, "reviews"),
                where("userId", "==", id),
                orderBy("createdTime", "desc")
            );
        } else {
            q = query(
                collection(db, "reviews"),
                where("seriesId", "==", id),
                orderBy("createdTime", "desc")
            );
        }

        const querySnapshot = await getDocs(q);
        const reviews = [];

        querySnapshot.forEach((doc) => {
            reviews.push({
                ...doc.data()
            });
        });

        return reviews;
    }
    catch(e){
        console.error(e);
    }
}

export const deleteReview = async (id) => {
    try {

        await deleteDoc(doc(db, "reviews", id));
    }
    catch(e){
        console.error(e);
    }
}