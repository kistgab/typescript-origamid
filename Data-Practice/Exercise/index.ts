import Statistics from "./Statistics.js";
import { CountList } from "./countBy.js";
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
      <td>${
        transaction.value?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }) || null
      }</td>
      <td>${transaction.paymentForm}</td>
      <td>${transaction.status}</td>
    </tr>
    `;
  });
}

function fillList(list: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);

  if (containerElement) {
    Object.keys(list).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${list[key]}</p>`;
    });
  }
}

function fillStatistics(transactions: ITransaction[]): void {
  const statistics = new Statistics(transactions);
  fillList(statistics.formaPagamento, "formaPagamento");
  fillList(statistics.status, "status");

  const totalElement = document.querySelector<HTMLElement>("#total span");
  if (totalElement)
    totalElement.innerText = statistics.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
}

const transactions = await fetchTransactions();
fillTable(transactions);
fillStatistics(transactions);
