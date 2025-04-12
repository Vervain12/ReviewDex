'use client'

import Image from "next/image"
import Link from "next/link"

export const SearchResults = ({ series }) => {

    return (
        <div className="flex flex-wrap justify-center gap-6 p-4">
            {series.map(item => (
                <li key={item.mal_id} className="flex flex-row items-start text-black font-bold bg-white m-4 p-4 rounded w-full max-w-2xl h-96">
                    <div className="mr-6">
                        <Image
                            width={350}
                            height={450}
                            src={item.images.jpg.large_image_url}
                            alt={"Cover for" || item.titles[0].title}/>
                    </div>
                    <div className="flex flex-col w-full h-full">
                        <div className="w-full flex justify-center">
                            <Link
                                className="hover:text-gray-600 cursor-pointer text-2xl font-mono"
                                href={`/series/${item.mal_id}`}>
                                    {item.titles[0].title}
                            </Link>
                        </div>
                        <div className="mt-6 flex-grow overflow-y-auto pr-2">
                            {item.synopsis}
                        </div>
                    </div>
                </li>
            ))}
        </div>
    )
}
