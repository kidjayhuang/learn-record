
/**
 * 第二十五题
 * https://github.com/semlinker/awesome-typescript/issues/44
 * 知识点:
 * 联合类型作为泛型的时候 extends 会触发分发执行(https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
 * 联合类型T 写成 [T] 就变成了普通类型，extends的时候不会分发执行(https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
 * 这里第一步的 T extends U 肯定为真，这个其实就是利用其分发的特性，后面的 [T] 就是一个联合类型拆开后的某一个，因此如果是联合类型的话 [U] extends [T] 一定为否
 */
type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never;

type I3 = IsUnion<string | number>; // true
type I4 = IsUnion<string | never>; // false
type I5 = IsUnion<string | unknown>; // false

export {};