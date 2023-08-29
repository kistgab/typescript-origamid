import countBy, { CountList } from "../functions/countBy.js";

interface CountPerWeekDay {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}

type TransactionWithValue = ITransaction & { value: number };

function hasValidValue(
  transaction: ITransaction
): transaction is TransactionWithValue {
  return transaction.value != null;
}

export default class Statistics {
  total: number;
  paymentForms: CountList;
  status: CountList;
  weekWithSalesPerDay: CountPerWeekDay;
  weekDayWithMoreSales: [string, number];

  constructor(private transactions: ITransaction[]) {
    this.total = this.setTotal();
    this.paymentForms = this.setPaymentForms();
    this.status = this.setStatus();
    this.weekWithSalesPerDay = this.setWeekWithSalesPerDay();
    this.weekDayWithMoreSales = this.setWeekDayWithMoreSales();
    this.paymentForms = this.setPaymentForms();
  }

  private setTotal() {
    const totalTransactionsValue = this.transactions
      .filter(hasValidValue)
      .reduce((totalValue, transaction) => {
        return totalValue + transaction.value;
      }, 0);
    return totalTransactionsValue;
  }

  private setPaymentForms(): CountList {
    return countBy(this.transactions.map(({ paymentForm }) => paymentForm));
  }

  private setStatus(): CountList {
    return countBy(this.transactions.map(({ status }) => status));
  }

  private setWeekWithSalesPerDay(): CountPerWeekDay {
    const weekDayCount: CountPerWeekDay = {
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    };
    this.transactions.forEach((transaction) => {
      const dayIndex = transaction.data.getDay();
      if (dayIndex == 0) weekDayCount.sunday++;
      else if (dayIndex == 2) weekDayCount.tuesday++;
      else if (dayIndex == 1) weekDayCount.monday++;
      else if (dayIndex == 3) weekDayCount.wednesday++;
      else if (dayIndex == 4) weekDayCount.thursday++;
      else if (dayIndex == 5) weekDayCount.friday++;
      else if (dayIndex == 6) weekDayCount.saturday++;
    });
    return weekDayCount;
  }

  private setWeekDayWithMoreSales(): [string, number] {
    const daysInDescOrder = Object.entries(this.weekWithSalesPerDay).sort(
      (nextDay, prevDay) => prevDay[1] - nextDay[1]
    );
    console.log(daysInDescOrder);
    return daysInDescOrder[0];
  }
}
