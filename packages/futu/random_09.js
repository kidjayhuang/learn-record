/**
 * 有函数x，50%概率返回0跟1，实现函数y，等概率返回0到9的数
 */
function x() {
  return Math.round(Math.random());
}

function y() {
  let ret = x() * 8 + x() * 4 + x() * 2 + x();
  if (ret < 10) {
    return ret;
  } else {
    return y();
  }
}
let i = 100000;
let hash = {};
while (i-- > 0) {
  const res = y();
  if (hash[res]) {
    hash[res]++;
  } else {
    hash[res] = 1;
  }
}
console.log(hash);
