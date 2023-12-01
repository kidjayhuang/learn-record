/**
 * 第十二题
 * https://github.com/semlinker/awesome-typescript/issues/30
 */
type Head<T extends Array<any>> = T extends [infer R, ...any[]] ? R : never;
// type Head<T extends Array<any>> = T extends [] ? never : T[0]
// type Head<T extends Array<any>> = T[0] extends undefined ? never : T[0]

// 测试用例
type H0 = Head<[]>; // never
type H1 = Head<[1]>; // 1
type H2 = Head<[3, 2]>; // 3


export {};