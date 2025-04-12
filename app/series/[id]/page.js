'use client'

import Header from "@/app/components/header";
import { getSeries } from "@/app/search/search-series";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CreateReview from "@/app/review/create-review";
import ReviewList from "@/app/review/review-list";
import { useUserAuth } from "@/app/_utils/auth-context";
import Image from "next/image"
import Link from "next/link";

export default function Series(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserAuth();
    const params = useParams();

    useEffect(() => {
        async function fetchSeriesData() {
            try {
                const result = await getSeries(params.id);
                setData(result);
                setLoading(false);
            } catch (e) {
                console.error("Failed to load: ", err);
                setLoading(false);
            }
        }

        fetchSeriesData();
    },[params.id])

    return (
        <div>
            <Header/>
            {loading? 
            <div>
                Loading...
            </div>
                :
            <div className="flex flex-col">
                <div className="flex justify-center w-full">
                    <h1 className="text-3xl font-mono">
                        {data.titles[0].title}    
                    </h1>      
                    <div className="flex flex-row">
                        <Image
                            width={250}
                            height={350}
                            src={data.images.jpg.large_image_url}
                            alt={"Cover for" || data.titles[0].title}/>
                        <div>
                            {data.synopsis}
                        </div>
                        <Link
                            href={data.url}>MyAnimeList</Link>
                    </div>     
                </div>
                
                <div className="flex flex-row">
                    <CreateReview id={params.id} user={user}/>
                    <ReviewList id={params.id}/>
                </div> 
                
            </div>
            }
        </div>
    )
}