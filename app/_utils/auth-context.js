"use client";

import React, { useContext, createContext, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
  } from 'firebase/auth';
import { auth } from './firebase';

const UserContext = createContext();

export const UserProvider =  ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
        } catch (error) {
            console.error("Sign Up Error:", error.message);
        }
    }

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
        setUser, 
        signUp, 
        signIn, 
        logout 
    }}>
        {children}
    </UserContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(UserContext);
}