/**
 * 第十七题
 * https://github.com/semlinker/awesome-typescript/issues/36
 */
type Includes<T extends Array<any>, E> = E extends T[number] ? true : false;

type I0 = Includes<[], 1>; // false
type I1 = Includes<[2, 2, 3, 1], 2>; // true
type I2 = Includes<[2, 3, 3, 1], 1>; // true


export {};