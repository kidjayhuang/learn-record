// 算法题

/**
 * 取无序整型数组中第二小的元素
 * [4,5,3,2,1,2,1]
 * 2
 * 前提是不能使用set、sorted方法
 * */

const arr = [4, 5, 3, 2, 1, 2, 1];

function getMin2(arr) {
  let min1 = Infinity;
  let min2 = Infinity;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element <= min1) {
      min1 = element;
    } else {
      if (element < min2) {
        min2 = element;
      }
    }
  }
  return min2;
}

console.log(getMin2(arr));
