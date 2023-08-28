import { fetchData } from "./fetchData.js";
import { sanitizeTransactionData } from "./sanitizeTransactionData.js";

export async function fetchTransactions(): Promise<ITransaction[]> {
  const transactionsData = await fetchData<IApiTransaction[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!transactionsData) {
    throw new Error("Transactions API data couldn't be found");
  }
  const sanitizedTransactions = transactionsData.map(sanitizeTransactionData);
  return sanitizedTransactions;
}

function fillTable(transactions: ITransaction[]): void {
  const table = document.querySelector("#transactions tbody");
  if (!table) return;
  transactions.forEach((transaction) => {
    table.innerHTML += `
    <tr>
      <td>${transaction.name}</td>
      <td>${transaction.email}</td>
      <td>${transaction.value}</td>
      <td>${transaction.paymentForm}</td>
      <td>${transaction.status}</td>
    </tr>
    `;
  });
}

fillTable(await fetchTransactions());
