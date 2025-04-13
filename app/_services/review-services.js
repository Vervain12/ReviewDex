import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, setDoc, deleteDoc, docRef, query, where, orderBy, doc, serverTimestamp } from "firebase/firestore";
import { getUserInfo } from "./account-services";

export const newReview = async (id, rating, title, text, user) => {

    try {
        const userDoc = await getUserInfo(user.uid);
        const username = userDoc.data().name;

        const reviewRef = doc(collection(db, "reviews"));

        await setDoc(reviewRef, {
            reviewId: reviewRef.id,
            seriesId: id,
            userId: user.uid,
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

        const q = query(
            collection(db, "reviews"),
            where("seriesId", "==", id),
            orderBy("createdTime", "desc")
        );

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