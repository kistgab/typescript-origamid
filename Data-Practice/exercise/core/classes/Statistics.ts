import countBy, { CountList } from "../functions/countBy.js";

type TransactionWithValue = ITransaction & { value: number };

function hasValidValue(
  transaction: ITransaction
): transaction is TransactionWithValue {
  return transaction.value != null;
}

export default class Statistics {
  total: number;
  formaPagamento: CountList;
  status: CountList;

  constructor(private transactions: ITransaction[]) {
    this.total = this.setTotal();
    this.formaPagamento = this.setPaymentForms();
    this.status = this.setStatus();
    this.setPaymentForms();
  }

  private setTotal() {
    const totalTransactionsValue = this.transactions
      .filter(hasValidValue)
      .reduce((totalValue, transaction) => {
        return totalValue + transaction.value;
      }, 0);
    return totalTransactionsValue;
  }

  private setPaymentForms() {
    return countBy(this.transactions.map(({ paymentForm }) => paymentForm));
  }

  private setStatus() {
    return countBy(this.transactions.map(({ status }) => status));
  }
}
