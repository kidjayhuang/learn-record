/**
 * 写个组合给方便孩子取名字
 */

// const queue = ["辰", "在", "有", "秀"];
const queue = ["雁", "南", "锦", "书", "采", "薇", "云", "岫", "鹤", "卿"];

function backtrack(list, temp, nums) {
  // 终止条件
  if (temp.length === 2) {
    return list.push([...temp]); // 存放结果
  }

  for (let i = 0; i < nums.length; i++) {
    // 找到一个不在 temp 里的数字（这里用数组的 api 可以判断是否重复，重复节点不放入 tmp）
    if (temp.includes(nums[i])) continue;

    temp.push(nums[i]); // 放进去一个元素
    backtrack(list, temp, nums); // 执行递归公式
    temp.pop(); // 撤回这个元素
  }
}

var permute = function (nums) {
  let list: string[][] = [];
  backtrack(list, [], nums);

  return list.map((item) => {
    return ["黄·", ...item].join("");
  });
};

console.log(permute(queue));
