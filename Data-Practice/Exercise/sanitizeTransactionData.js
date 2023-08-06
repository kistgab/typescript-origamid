import { currencyToValue } from "./currencyToValue.js";
export function sanitizeTransactionData(transaction) {
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
