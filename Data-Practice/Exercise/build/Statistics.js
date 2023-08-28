function hasValidValue(transaction) {
    return transaction.value != null;
}
export default class Statistics {
    transactions;
    total;
    constructor(transactions) {
        this.transactions = transactions;
        this.total = this.setTotal();
    }
    setTotal() {
        const totalTransactionsValue = this.transactions
            .filter(hasValidValue)
            .reduce((totalValue, transaction) => {
            return totalValue + transaction.value;
        }, 0);
        return totalTransactionsValue;
    }
}
