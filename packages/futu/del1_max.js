// 算法题

/**
 * 给定一个整数数组，使得去除一个数后，剩余数相乘最大
 * */
/**
 * 思路：
 * 1. 有奇数个负数，去除绝对值最小的负数
 * 2. 有偶数个负数（包括0个），去除最小的非负数
 */

const arr = [4, 5, 3, 2, 1, 2, 1];

function del1_max(arr) {
  arr.sort();
  let minus = [];
  let plus = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element < 0) {
      minus.push(element);
    } else {
      plus.push(element);
    }
  }
  if (minus.length % 2 === 0) {
    // 偶数个负数
    return plus[0];
  } else {
    return minus[minus.length - 1];
  }
}

console.log(del1_max(arr));
