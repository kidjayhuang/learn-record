/**
 * 第十一题
 * https://github.com/semlinker/awesome-typescript/issues/29
 */
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type E2 = IsEqual<[1], []>; // false


export {};