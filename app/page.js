"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useState } from "react";

export default function Home() {
  const { user, signUp, logout, signIn } = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const newUser = await signUp(email, password);
    if (newUser) {
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    const currentUser = await signIn(email, password);
    if (currentUser) {
    }
  }

  const handleLogout = async () => {
    await logout();
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white shadow-md rounded-md w-80">
        <h1 className="text-black font-bold p-2 text-center text-xl mb-4 font-mono">ReviewDex</h1>        
        <form className="space-y-4">
          <input
            className="w-full p-2 border rounded text-gray-500"
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full p-2 border rounded text-gray-500"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex space-x-4 pt-2">
            <button
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleSignUp}>
              Sign up
            </button>
            <button
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleSignIn}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
