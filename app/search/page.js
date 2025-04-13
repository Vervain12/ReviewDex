'use client'

import Header from "../components/header"
import { useState } from "react"
import { searchManga } from "../_services/search-series";
import { SearchResults } from "./search-results";

export default function Search() {

    const [search, setSearch] = useState("");
    const [series, setSeries] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        const results = await searchManga(search);
        setSeries(results);
    }

    return (
        <main className="min-h-screen">
            <Header/>
            <div className="flex flex-row space-x-1 items-center justify-center pt-10">
                <form>
                    <input
                    className="w-55 p-2 border border-gray-500 rounded text-white"
                    type="search"
                    placeholder="Series Name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    />
                </form>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={handleSearch}>Search</button>
            </div>
            {series && (<SearchResults series={series}/>)}
        </main>
    )
}