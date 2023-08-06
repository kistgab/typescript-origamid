export async function fetchData(url) {
    try {
        const response = await fetch(url);
        const transactionsData = await response.json();
        if (!response.ok)
            throw new Error(`Error: ${response.status}`);
        return transactionsData;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`fetchData: ${error.message}`);
        }
        return null;
    }
}
