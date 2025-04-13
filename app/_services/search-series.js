// Query handler

export const searchManga = async (query) => {
    const apiUrl = `https://api.jikan.moe/v4/manga?q=${query}&limit=10&sfw`;

    try {
        const reply = await fetch(apiUrl);
        const fullData = await reply.json();
        return fullData.data;   
    }
    catch (e){
        console.error("Error: " + e)
    }
}

export const getSeries = async (id) => {
    const apiUrl = `https://api.jikan.moe/v4/manga/${id}`;

    try {
        const reply = await fetch(apiUrl);
        const fullData = await reply.json();
        return fullData.data;   
    }
    catch (e){
        console.error("Error: " + e)
    }
}