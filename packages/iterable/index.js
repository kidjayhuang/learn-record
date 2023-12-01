function makeIterator(array) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length ? {
        value: array[nextIndex++],
        done: false,
      } : {
        value: undefined,
        done: true,
      }
    },
  };
}

const iterator = makeIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

