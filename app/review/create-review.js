'use client'

import { useState } from "react";
import { newReview } from "../_services/review-services";

export default function CreateReview({id, user}) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(5);
    const [loggedIn, setLoggedIn] = useState(true);
    
    const handleNewReview = async (event) => {
        event.preventDefault();
        setLoggedIn(true);
        if (user){
            await newReview(id, rating, title, text);        
        } else {
            setLoggedIn(false);
        }
    } 

    return(
        <div className="">
            <form className="flex flex-row  space-x-4">
                <div className="flex flex-col space-y-4 ">
                    <textarea
                        className="pr-3 resize-none w-100 h-10 border border-gray-300 rounded-lg text-gray-800 bg-white"
                        placeholder="Review Title"
                        value={title}

                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        className="pr-3 w-100 h-40 resize-none border border-gray-300 rounded-lg text-gray-800 bg-white"
                        placeholder="Write your review here."
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />                    
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center  space-x-2 align-middle">
                        <div className="text-white font-medium">Rating:</div>
                        <input
                            className="w-13 p-1 border border-gray-300 rounded-md text-center text-white "
                            type="number"
                            min="1"
                            max="10"
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <button
                            type="submit"
                            className="align-middle w-25 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                            onClick={handleNewReview}
                        >
                            Submit Review
                        </button>                   
                    </div>    
                    {loggedIn ? <></> : <div className="text-red-500 font-medium w-100">You must be signed in to post a review.</div>}                 
                </div>
            </form>
        </div>
    )
}