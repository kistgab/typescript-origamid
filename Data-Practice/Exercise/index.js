import { fetchData } from "./modules/fetchData/fetchData.js";
export function sanitizeTransactionData(transactions) {
    const sanitizedTransactions = transactions.map((transaction) => ({
        status: transaction.Status,
        id: transaction.ID,
        data: new Date(transaction.Data),
        isNewClient: !!transaction["Cliente Novo"],
        email: transaction.Email,
        paymentForm: transaction["Forma de Pagamento"],
        name: transaction.Nome,
        valor: transaction["Valor (R$)"],
    }));
    return sanitizedTransactions;
}
export async function fetchTransactions() {
    const transactionsData = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (!transactionsData) {
        throw new Error("Transactions API data couldn't be found");
    }
    const sanitizedTransactions = sanitizeTransactionData(transactionsData);
    console.log(sanitizedTransactions);
    return sanitizedTransactions;
}
fetchTransactions();
