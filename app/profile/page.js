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

    return(
        <div className="font-mono">
            <Header/>
            {/*To avoid Error: user is null*/}
            {user ? 
            <div>
                <PfpList/> 
                <ReviewList id={user.uid} refreshReviews={handleRefresh}/>
                <button onClick={handleLogout}>Logout</button>
            </div> 
            : 
            <></>}
            
        </div>
    )
}