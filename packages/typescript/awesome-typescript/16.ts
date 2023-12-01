/**
 * 第十六题
 * https://github.com/semlinker/awesome-typescript/issues/35
 */
type Push<T extends any[], V> = [...T, V];

// 测试用例
type ArrPush0 = Push<[], 1>; // [1]
type ArrPush1 = Push<[1, 2, 3], 4>; // [1, 2, 3, 4]


export {};