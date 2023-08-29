export default function countBy(arr) {
    return arr.reduce((total, paymentForm) => {
        if (total[paymentForm]) {
            total[paymentForm]++;
        }
        else {
            total[paymentForm] = 1;
        }
        return total;
    }, {});
}
