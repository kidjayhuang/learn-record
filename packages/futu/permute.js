// var permute = function (nums) {
//   let ret = [];
//   let path = [];
//   function bracktracking(used = []) {
//     for (let i = 0; i < nums.length; i++) {
//       if (path.length === nums.length) {
//         ret.push([...path]);
//         return;
//       }
//       if (used[i]) continue;
//       path.push(nums[i]);
//       used[i] = true;
//       bracktracking(used);
//       used[i] = false;
//       path.pop();
//     }
//   }
//   bracktracking();
//   return ret;
// };

var permute = function (nums) {
  let ret = [];
  let path = [];
  function bracktracking(used = {}) {
    for (let index = 0; index < nums.length; index++) {
      if (path.length === nums.length) {
        ret.push([...path]);
        return;
      }
      const v = nums[index];
      if (used[v]) continue;
      path.push(v);
      used[v] = true;
      bracktracking(used);
      used[v] = false;
      path.pop(v);
    }
  }
  bracktracking();
  return ret;
};

console.log(permute([1, 2, 3]));
console.log(permute([0, 1]));
console.log(permute([1]));
