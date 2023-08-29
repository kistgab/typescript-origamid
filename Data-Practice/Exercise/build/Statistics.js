import countBy from "./countBy.js";
function hasValidValue(transaction) {
    return transaction.value != null;
}
export default class Statistics {
    transactions;
    total;
    pagamento;
    status;
    constructor(transactions) {
        this.transactions = transactions;
        this.total = this.setTotal();
        this.pagamento = this.setPaymentForms();
        this.status = this.setStatus();
        this.setPaymentForms();
    }
    setTotal() {
        const totalTransactionsValue = this.transactions
            .filter(hasValidValue)
            .reduce((totalValue, transaction) => {
            return totalValue + transaction.value;
        }, 0);
        return totalTransactionsValue;
    }
    setPaymentForms() {
        return countBy(this.transactions.map(({ paymentForm }) => paymentForm));
    }
    setStatus() {
        return countBy(this.transactions.map(({ status }) => status));
    }
}
