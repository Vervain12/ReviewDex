import Link from "next/link"

export default function Header () {
    return (
        <div className="flex items-center border-b-blue-500 border-b-3 w-full h-30 justify-center bg-white">
            <div className="flex flex-col items-center mx-auto w-screen">
                <div>
                    <h1 className="text-black font-bold p-2 text-center text-3xl mb-4 font-mono">ReviewDex</h1>  
                </div>
                <div className="flex flex-row space-x-15">
                    <Link href="/search" className="text-xl font-mono text-gray-800">Search</Link>  
                    <Link href="/profile" className="text-xl font-mono text-gray-800">Profile</Link>  
                </div>
            </div>
        </div>
    )
}