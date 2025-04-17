'use client'

import React, { useContext, createContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
  } from 'firebase/auth';
import { auth } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

const UserContext = createContext();

export const UserProvider =  ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pfpOptions, setPfpOptions] = useState([]);

    // Should be a component since this block is used multiple times
    useEffect(() => {
      async function fetchPfpOptions() {
        try {
        const response = await fetch('/api/pfp-options');
        const data = await response.json();
        setPfpOptions(data);
        } catch (error) {
        console.error('Error fetching profile picture options:', error);
        }
      }
      
      fetchPfpOptions();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    {/* I cannot afford firebase cloud storage 
    const uploadProfilePicture = async (image) => {
        try{
            const storage = getStorage();
            const pfpRef = ref(storage, `profile_pictures/${currentUser.uid}`);
            await uploadBytes(pfpRef, image);
        } catch (error){
            console.error("Unable to upload profile picture: ", error.message);
        }
    };

    const getProfilePicture = async () => {
        try {
            const storage = getStorage();
            const pfpRef = ref(storage, `profile_pictures/${currentUser.uid}`);
            const url = await getDownloadURL(pfpRef);
            return url;
        } catch (error){
            console.error("Unable to fetch profile picture: ", error.message);
        }
    }
    */}

    const changeProfilePicture = async (imageLink) => {
        updateProfile(auth.currentUser, {
            photoURL : imageLink
        })
    }

    const signUp = async (email, password, username) => {
        try {
            const image = pfpOptions[0];
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )
            const newUser = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: image
            })

            return newUser;
        } catch (error) {
            console.error("Sign Up Error:", error.message);
        }
    };

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
            auth, 
            email, 
            password
            );
            const currentUser = userCredential.user;
            setUser(currentUser);
        } catch (error) {
            console.error("Sign In Error:", error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error.message);
            throw error;
        }
    };

    return (
    <UserContext.Provider value={{ 
        user, 
        loading,
        setUser, 
        signUp, 
        signIn, 
        logout,
        changeProfilePicture
    }}>
        {!loading && children}
    </UserContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(UserContext);
}