'use client'

import { useUserAuth } from "../_utils/auth-context"
import Header from "../components/header";
import PfpList from "../components/pfp-options-list";
import { useRouter } from "next/navigation";

export default function Profile() {
    const { user, logout } = useUserAuth();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
        logout();
    }

    return(
        <div className="font-mono">
            <Header/>
            {/*To avoid Error: user is null*/}
            {user ? <div><PfpList/> <button onClick={handleLogout}>Logout</button></div>: <></>}
            
        </div>
    )
}