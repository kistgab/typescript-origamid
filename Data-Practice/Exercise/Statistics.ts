type TransactionWithValue = ITransaction & { value: number };

function hasValidValue(
  transaction: ITransaction
): transaction is TransactionWithValue {
  return transaction.value != null;
}

export default class Statistics {
  total: number;
  constructor(private transactions: ITransaction[]) {
    this.total = this.setTotal();
  }

  private setTotal() {
    const totalTransactionsValue = this.transactions
      .filter(hasValidValue)
      .reduce((totalValue, transaction) => {
        return totalValue + transaction.value;
      }, 0);
    return totalTransactionsValue;
  }
}
