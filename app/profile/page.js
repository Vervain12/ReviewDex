'use client'

import { useUserAuth } from "../_utils/auth-context"
import { useState } from "react";
import Header from "../components/header";
import PfpList from "../components/pfp-options-list";
import { useRouter } from "next/navigation";
import ReviewList from "../review/review-list";

export default function Profile() {
    const { user, logout } = useUserAuth();
    const [refreshReviews, setRefreshReviews] = useState(true);
    const router = useRouter();

    const handleRefresh = () => {
        setRefreshReviews(!refreshReviews);
    }

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            router.push('/');
        }, 100);
    }

    return (
        <div className="font-mono min-h-screen bg-black">
          <Header />
          {user ? (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
                <div className="w-full md:w-1/2 p-6 rounded-lg flex justify-end pr-20">
                  <div className="md:max-w-xs">
                    <h2 className="text-2xl font-semibold mb-4 text-white">{user.displayName}</h2>
                    <PfpList />
                    <button
                      className="mt-6 px-4 py-2 border border-blue-500 text-white rounded hover:bg-opacity-10 transition-colors cursor-pointer"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-6 rounded-lg pl-20">
                  <ReviewList id={user.uid} refreshReviews={handleRefresh} />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
}
