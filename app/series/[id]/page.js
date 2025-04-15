'use client'

import Header from "@/app/components/header";
import { getSeries } from "@/app/_services/search-series";
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
    const [refreshReviews, setRefreshReviews] = useState(true);
    const { user } = useUserAuth();
    const params = useParams();

    const handleRefresh = () => {
        setRefreshReviews(!refreshReviews);
    }

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
            <div className="flex flex-col justify-center items-center pl-8 pt-6">
                    <div className="flex flex-row gap-8">   
                        <div className="">
                                <Image
                                    width={350}
                                    height={450}
                                    src={data.images.jpg.large_image_url}
                                    alt={"Cover for " + data.titles[0].title}
                                    className="rounded"
                                />
                        </div>
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <h1 className="text-3xl font-mono font-bold">
                                {data.titles[0].title}    
                            </h1>
                            <div className="border-2 border-blue-500 font-mono p-4 rounded-md bg-gray-50">
                                <h2 className="text-xl mb-2 text-black font-semibold">Synopsis</h2>
                                <p className="text-gray-800 mb-4 overflow-auto h-100">
                                    {data.synopsis}
                                </p>
                                <Link 
                                    href={data.url} 
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                    target="_blank"
                                >
                                    View on MyAnimeList
                                </Link>
                            </div>
                            <CreateReview id={params.id} user={user} handleRefreshReviews={handleRefresh}/>
                        </div>
                        <ReviewList id={params.id} refreshReviews={refreshReviews}/>
                    </div>
            </div>
            }
        </div>
    )
}