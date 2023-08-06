import { fetchData } from "./fetchData.js";
import { sanitizeTransactionData } from "./sanitizeTransactionData.js";
// Manipulação de Dados
// 1 - Acesse os dados da api: https://api.origamid.dev/json/transacoes.json
// 2 - Mostre em uma tabela os dados de cada transação.
// 3 - Calcule:
// 3.1 - Soma total dos valores
// 3.2 - Transações por meio de pagamento.
// 3.3 - Transações por status.
// 3.4 - Total de vendas por dia da semana.
// 3.5 - Dia da semana com mais vendas.
// 4 - Mostre as estatísticas na tela.
// 5 - Organize o código em pequenos módulos.
// 6 - Normalize os dados da API se achar necessário.
// Link do Projeto
// https://www.origamid.com/projetos/typescript/dados
export async function fetchTransactions() {
    const transactionsData = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!transactionsData) {
        throw new Error("Transactions API data couldn't be found");
    }
    const sanitizedTransactions = transactionsData.map(sanitizeTransactionData);
    console.log(sanitizedTransactions);
    return sanitizedTransactions;
}
fetchTransactions();
