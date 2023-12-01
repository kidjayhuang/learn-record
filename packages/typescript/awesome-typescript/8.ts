
/**
 * 第八题
 * https://github.com/semlinker/awesome-typescript/issues/26
 */
type NonEmptyArray<T> = [T, ...T[]];
// type NonEmptyArray<T> = T[] & { 0: T };

const a: NonEmptyArray<string> = []; // 将出现编译错误
const b: NonEmptyArray<string> = ["Hello TS"]; // 非空数据，正常使用


export {};