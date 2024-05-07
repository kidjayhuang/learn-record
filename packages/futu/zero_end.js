/**
 * 将数组中的0元素移至最后
 * 要求空间复杂度为O(1)
 * @param {} vers
 * @returns
 */
// function zero_end(arr) {
//   for (let index = arr.length-1; index >= 0; index--) {
//     const element = arr[index];
//     if(element === 0) {
//       arr.splice(index, 1)
//       arr.push(0)
//     }
//   }
//   return arr
// }

function zero_end(nums) {
  let idx = 0;
  for (let num of nums) {
    if (num !== 0) {
      nums[idx++] = num;
    }
  }
  while (idx < nums.length) {
    nums[idx++] = 0;
  }
  return nums
}

console.log(zero_end([1, 3, 3, 0, 4, 0, 6, 7]));
