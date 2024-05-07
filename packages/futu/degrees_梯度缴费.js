// 算法题

/**
 * 梯度缴费
 * */

const grads = [5, 15, 30, 50, 400, 500, 1000, 1000, 1000, 1000, 1000, 0];
const gradPrices = [30, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function calc(degrees) {
  let idx = 0;
  let prev = degrees;
  let count = 0;
  for (let index = 0; index < grads.length; index++) {
    const element = grads[index];
    const res = prev - element;
    if (res <= 0) {
      idx = index;
      break;
    } else {
      prev = res;
    }
  }

  for (let index = 0; index <= idx; index++) {
    const price = gradPrices[index];
    const degree = grads[index];
    if(index === idx) {
        count += price * prev;
    } else {
        count += price * degree;
    }
  }
  return count
}
console.log(calc(21));
