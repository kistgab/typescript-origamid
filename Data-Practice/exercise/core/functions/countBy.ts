export interface CountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  return arr.reduce((total: CountList, paymentForm) => {
    if (total[paymentForm]) {
      total[paymentForm]++;
    } else {
      total[paymentForm] = 1;
    }
    return total;
  }, {});
}
