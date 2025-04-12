'use client'

import { useState, useEffect } from "react"
import { getReviews } from "../_services/review-services";

export default function ReviewList({id}) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchReviews = async (event) => {
            try {
                const result = await getReviews(id);
                setReviews(result);
                setLoading(false);
            } catch (e) {
                console.error("Failed to load: ", err);
                setLoading(false);
            }
        }

        fetchReviews();
    },[reviews])


    return (
        <div>
            {loading? 
                <div>
                    Loading...
                </div>
                    :
                <div>
                    <h2 className="text-2xl font-mono">Reviews:</h2>
                    {!reviews ? <div>No reviews found. Be the first!</div>
                    :
                    <div>
                        <ul className="space-y-6">
                            {reviews.map(item => (
                                <li key={item.reviewId}  className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="w-full flex flex-col justify-center">
                                        <div className="rounded text-black">User: {item.username}</div>
                                        <div className="rounded text-black">Rating: {item.rating}</div>
                                        <div className="w-55 h-55 p-2 rounded text-black">{item.text}</div>
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