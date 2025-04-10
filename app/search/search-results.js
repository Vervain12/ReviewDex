// Print list of items returned by query

export const SearchResults = ({ series }) => {

    const handleClicked = () => {
        // Route to series page
    }

    return (
        <div className="flex flex-col items-center">
            {series.map(item => (
                <li key={item.mal_id} className="flex flex-col justify-center text-black font-bold bg-white m-4 p-2 max-w-sm rounded"
                    onClick={handleClicked}>
                    {item.titles[0].title}
                </li>
            ))}
        </div>
    )
}
