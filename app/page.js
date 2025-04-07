"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useState } from "react";
import { newUser } from "./_services/account-services";

export default function Home() {
  const { signUp, logout, signIn } = useUserAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleRegister, setToggleRegister] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const registeredUser = await signUp(email, password);
    if (registeredUser) {
      await newUser(registeredUser.uid, username);
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    const currentUser = await signIn(email, password);
    if (currentUser) {
    }
  }

  const handleToggle = async (event) => {
    event.preventDefault();
    setToggleRegister(!toggleRegister);
    if (toggleRegister == true) {
      setUsername("");
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
          {toggleRegister ?
            <input
              className="w-full p-2 border border-gray-500 rounded text-black"
              type="username"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              /> : <></>
          }
          <input
            className="w-full p-2 border border-gray-500 rounded text-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-500 rounded text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex space-x-4 pt-2">
          {toggleRegister ? 
            <button
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleSignUp}>
              Sign Up
            </button> 
            :
            <button
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleSignIn}>
              Sign In
            </button>
          }
            <button
              className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 whitespace-nowrap"
              onClick={handleToggle}>
              {toggleRegister ? <div>Sign In</div> : <div>Register</div>}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
