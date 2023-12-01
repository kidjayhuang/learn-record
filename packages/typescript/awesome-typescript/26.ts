/**
 * 第二十六题
 * https://github.com/semlinker/awesome-typescript/issues/45
 * 这边 [T] 和 [never]为元组，作为包装类型，如果联合类型被包装过，就不会被展开。
 * 另外，因为 never 类型不能扩展 never 类型，但是 never[] 可以扩展 never[] 。
 * 详细可以看文档介绍：https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 * 也可以看这个例子：
 *
 * type ToArray<Type> = Type extends any ? Type[] : never;
 * type StrArrOrNumArr = ToArray<string | number>;   // type StrArrOrNumArr = string[] | number[]
 * type ToArray2<Type> = [Type] extends [any] ? Type[] : never;
 * type StrArrOrNumArr2 = ToArray2<string | number>;  // type StrArrOrNumArr2 = (string | number)[]
 */

type IsNever<T> = [T] extends [never] ? true : false;
type I6 = IsNever<never>; // true
type I7 = IsNever<never | string>; // false
type I8 = IsNever<null>; // false


export {};