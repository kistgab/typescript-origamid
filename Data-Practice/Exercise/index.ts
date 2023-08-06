import { fetchData } from "./modules/fetchData/fetchData.js";
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
// https://www.origamid.com/projetos/typescript/dados/
type TransactionPaymentForm = "Cartão de Crédito" | "Boleto";
type TransactionStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento";

export interface ITransaction {
  status: TransactionStatus;
  id: number;
  data: Date;
  isNewClient: boolean;
  email: string;
  paymentForm: TransactionPaymentForm;
  name: string;
  valor: number;
}
export interface IApiTransaction {
  Status: TransactionStatus;
  ID: number;
  Data: string;
  ["Cliente Novo"]: 0 | 1;
  Email: string;
  ["Forma de Pagamento"]: TransactionPaymentForm;
  Nome: string;
  ["Valor (R$)"]: number;
}

export function sanitizeTransactionData(
  transactions: IApiTransaction[]
): ITransaction[] {
  const sanitizedTransactions = transactions.map(
    (transaction): ITransaction => ({
      status: transaction.Status,
      id: transaction.ID,
      data: new Date(transaction.Data),
      isNewClient: !!transaction["Cliente Novo"],
      email: transaction.Email,
      paymentForm: transaction["Forma de Pagamento"],
      name: transaction.Nome,
      valor: transaction["Valor (R$)"],
    })
  );
  return sanitizedTransactions;
}

export async function fetchTransactions(): Promise<ITransaction[]> {
  const transactionsData = await fetchData<IApiTransaction[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );
  if (!transactionsData) {
    throw new Error("Transactions API data couldn't be found");
  }
  const sanitizedTransactions = sanitizeTransactionData(transactionsData);
  console.log(sanitizedTransactions);
  return sanitizedTransactions;
}

fetchTransactions();
