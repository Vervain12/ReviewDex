'use client'
import { useState, useEffect } from "react"
import { getReviews, deleteReview } from "../_services/review-services";
export default function ReviewList({id, refreshReviews}) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const fetchReviews = async (event) => {
            try {
                const result = await getReviews(id);
                setReviews(result);
                setLoading(false);
            } catch (e) {
                console.error("Failed to load: ", e);
                setLoading(false);
            }
        }
        fetchReviews();
    },[refreshReviews]);
    const handleDelete = async (id)=> {
        deleteReview(id);
        refreshReviews();
    }
    return (
        <div>
            {loading?
                <div>
                    Loading...
                </div>
                    :
                <div className="gap-4 space-y-6">
                    <h2 className="text-2xl font-mono">Reviews:</h2>
                    {!reviews ? <div className="font-mono">No reviews found.</div>
                    :
                    <div>
                        <ul className="space-y-6 h-150 w-100 overflow-y-auto">
                            {reviews.map(item => (
                                <li key={item.reviewId}  className="bg-white  w-full border-blue-500 border-2 shadow-md overflow-y-auto">
                                    <div className="flex flex-col justify-center font-mono text-black">
                                        <div className="flex flex-row space-x-2 relative">
                                            {id.length > 10 && 
                                                <button onClick={() => handleDelete(item.reviewId)} className="absolute top-0 right-0 text-xl cursor-pointer">x</button>
                                            }
                                            <img width={100} height={100}src={`/pfpOptions/${item.image}`} alt={`Profile Picture of ${item.username}`}
                                                className="border border-black h-25"/>
                                            <div className="flex flex-col flex-grow">
                                                <div className="flex items-center">
                                                    <h2 className="text-black font-semibold text-xl">{item.title}</h2>
                                                </div>
                                                <div className="text-black">User: {item.username}</div>
                                                <div className="text-black">Rating: {item.rating} / 10</div>  
                                                {id.length > 10 ? <div className="text-black overflow-y-auto ">Series: {item.seriesName}</div> : <></>}                                                
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full h-50 border-t-2 border-t-blue-500 p-2 text-black">
                                            <div>{item.text}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    }
                </div>
            }
        </div>
    )
}