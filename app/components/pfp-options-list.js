// List of profile picture options, displayed as a box that opens on click within page.js
// Either fetch each option from imgur or store each locally
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";


const PfpList = () => {
    const [pfpOptions, setPfpOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleSelect, setToggleSelect] = useState(true);
    const { user, changeProfilePicture } = useUserAuth();
    const currentPfp = user?.photoURL;
    const router = useRouter();

    useEffect(() => {
        async function fetchPfpOptions() {
            setLoading(true);
            try {
            const response = await fetch('/api/pfp-options');
            const data = await response.json();
            setPfpOptions(data);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching profile picture options:', error);
            }
        }
        
        fetchPfpOptions();
    }, []);

    const handleToggleSelect = () => {
        setToggleSelect(!toggleSelect);
    }

    const handleSelectPfp = async (image) => {
        await changeProfilePicture(image);
        handleToggleSelect();

        // Reloading page
        setTimeout(() => {
            router.push('/profile');
        }, 300);
    }

    return (
        <div className="font-mono">
            <div>
                Profile Picture:
            </div>
            <button onClick={handleToggleSelect} className="border-blue-500 border-2 cursor-pointer">
                <img key={currentPfp} width={150} height={150} src={`/pfpOptions/${currentPfp}`} alt={`Profile Picture of ${user.displayName}`}/>
            </button>
            {toggleSelect ? <></> : 
            <div>
                {loading? <div>Images Loading...</div> : 
                <div className="">
                    <div className="w-110 h-100 overflow-y-scroll space-x-1 space-y-0.5 border-2 border-blue-500">
                    {pfpOptions.map((image, index) => (
                        <button key={index} onClick={() => handleSelectPfp(image)} className="cursor-pointer">
                            <img width={100} height={100} src={`/pfpOptions/${image}`} alt={`Profile Picture ${index}`}/>
                        </button>))}  
                    </div>  
                </div>}
            </div>}
        </div>
    )   
};

export default PfpList;