
/**
 * 第十五题
 * https://github.com/semlinker/awesome-typescript/issues/34
 */
type Shift<T extends any[]> = T extends [infer R, ...infer U] ? U : [];

// 测试用例
type S = Shift<[]>;
type S0 = Shift<[1, 2, 3]>;
type S1 = Shift<[string, number, boolean]>;

export {};