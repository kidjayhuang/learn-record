/**
 * 字符串替换子串的最优算法
 */

function kmp(source, pattern, replacement) {
  const n = source.length;
  const m = pattern.length;
  const next = getNext(pattern);
  let i = 0;
  let j = 0;
  let result = "";

  while (i < n) {
    if (source[i] === pattern[j]) {
      i++;
      j++;
      if (j === m) {
        result += replacement;
        j = next[j - 1];
      }
    } else if (j > 0) {
      j = next[j - 1];
    } else {
      result += source[i];
      i++;
    }
  }

  return result;
}

function getNext(pattern) {
  const m = pattern.length;
  const next = new Array(m).fill(0);
  let i = 1;
  let j = 0;

  while (i < m) {
    if (pattern[i] === pattern[j]) {
      j++;
      next[i] = j;
      i++;
    } else if (j > 0) {
      j = next[j - 1];
    } else {
      next[i] = 0;
      i++;
    }
  }

  return next;
}


console.log(kmp('啊实打腾讯实的腾讯阿萨德', '腾讯', '美的'))
