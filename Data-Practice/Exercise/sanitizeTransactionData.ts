import { currencyToValue } from "./currencyToValue.js";

declare global {
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
    valor: number | null;
  }
  export interface IApiTransaction {
    Status: TransactionStatus;
    ID: number;
    Data: string;
    ["Cliente Novo"]: 0 | 1;
    Email: string;
    ["Forma de Pagamento"]: TransactionPaymentForm;
    Nome: string;
    ["Valor (R$)"]: string;
  }
}

export function sanitizeTransactionData(
  transaction: IApiTransaction
): ITransaction {
  return {
    status: transaction.Status,
    id: transaction.ID,
    data: new Date(transaction.Data),
    isNewClient: Boolean(transaction["Cliente Novo"]),
    email: transaction.Email,
    paymentForm: transaction["Forma de Pagamento"],
    name: transaction.Nome,
    valor: currencyToValue(transaction["Valor (R$)"]),
  };
}
