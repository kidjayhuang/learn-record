

/**
 * 第十四题
 * https://github.com/semlinker/awesome-typescript/issues/32
 */
type Unshift<T extends any[], E> = [E, ...T];

// 测试用例
type Arr0 = Unshift<[], 1>; // [1]
type Arr1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]

export {};