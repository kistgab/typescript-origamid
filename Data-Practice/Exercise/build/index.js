import { fetchData } from "./fetchData.js";
import { sanitizeTransactionData } from "./sanitizeTransactionData.js";
export async function fetchTransactions() {
    const transactionsData = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!transactionsData) {
        throw new Error("Transactions API data couldn't be found");
    }
    const sanitizedTransactions = transactionsData.map(sanitizeTransactionData);
    // console.log(sanitizedTransactions);
    return sanitizedTransactions;
}
fetchTransactions();
