'use client'

import { useState } from "react";
import { newReview } from "../_services/review-services";

export default function CreateReview({id, user}) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(3);
    
    const handleNewReview = async (event) => {
        event.preventDefault();
        await newReview(id, rating, text, user);
    } 

    return(
        <div className="p-4">
            <form className="space-y-4 flex flex-col">
                <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Write your review here."
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                
                <div className="flex items-center justify-center space-x-2">
                    <div className="text-white font-medium">Rating:</div>
                    <input
                        className="w-16 p-2 border border-gray-300 rounded-md text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="align-middle w-25 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={handleNewReview}
                    >
                        Submit Review
                    </button>                    
                </div>
            </form>
        </div>
    )
}