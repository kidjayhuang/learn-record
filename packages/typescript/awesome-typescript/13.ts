/**
 * 第十三题
 * https://github.com/semlinker/awesome-typescript/issues/31
 */
type Tail<T extends Array<any>> = T extends [infer R, ...infer U] ? U : [];

// 测试用例
type T0 = Tail<[]>; // []
type T1 = Tail<[1, 2]>; // [2]
type T2 = Tail<[1, 2, 3, 4, 5]>; // [2, 3, 4, 5]


export {};