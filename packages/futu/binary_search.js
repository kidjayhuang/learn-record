function binary_search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] > target) {
      right = mid -1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

var arr = [1, 1, 2, 2, 3, 3, 3, 4, 5, 5, 7, 8, 9];
console.log(binary_search(arr, 7));
