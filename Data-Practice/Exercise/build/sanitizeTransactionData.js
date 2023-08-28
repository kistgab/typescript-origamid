import { currencyToValue } from "./currencyToValue.js";
import { stringToDate } from "./stringToDate.js";
export function sanitizeTransactionData(transaction) {
    return {
        status: transaction.Status,
        id: transaction.ID,
        data: stringToDate(transaction.Data),
        isNewClient: Boolean(transaction["Cliente Novo"]),
        email: transaction.Email,
        paymentForm: transaction["Forma de Pagamento"],
        name: transaction.Nome,
        valor: currencyToValue(transaction["Valor (R$)"]),
    };
}
