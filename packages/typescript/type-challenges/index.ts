// hard 看到 DeepPick

// import type { Debug, Expect, Equal } from "@type-challenges/utils";

// -------------- from @type-challenges/utils --------------
export type Expect<T extends true> = T;
export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type IsTrue<T extends true> = T;
export type IsFalse<T extends false> = T;

export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type NotAny<T> = true extends IsAny<T> ? false : true;

export type Debug<T> = { [K in keyof T]: T[K] };
export type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
  ? true
  : false;
export type ExpectValidArgs<
  FUNC extends (...args: any[]) => any,
  ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false;

/**
 * 联合类型转交叉类型
 * @example
 * type cases = [
 *   Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
 *   Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
 * ]
 * The following example demonstrates how multiple candidates for the same type variable in co-variant positions causes a union type to be inferred:
 * ```
 * type Foo<T> = T extends {a: infer U, b: infer U} ? U : never;
 * type T10 = Foo<{a: string; b: string}>; // string
 * type T11 = Foo<{a: string; b: number}>; // number
 * ```
 * Likewise,multiple candidates for the same type variable in contra-variant positions causes an intersection type to be inferred:
 * ```
 * type Bar<T> = T extends {a: (x: infer U) => void; b: (x: infer U) => void}
 * ? U
 * : never
 * type T20 = Bar<a: (x: string) => void; b: (x: string) => void> // string
 * type T21 = Bar<a: (x: string) => void; b: (x: number) => void> // string & number
 * ```
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
// -------------- from @type-challenges/utils --------------

export type Cases = [
  Expect<Equal<keyof any, PropertyKey>>,
  Expect<Equal<PickPropertyKey1<Foo, "name">, PickPropertyKey2<Foo, "name">>>
];
export type Foo = { name: string };
/**
 * 以下两种写法效果相同
 * [K in U as K extends PropertyKey ? K : never] 等同 [K in U & PropertyKey]
 */
export type PickPropertyKey1<T, U extends keyof T> = {
  [K in U as K extends PropertyKey ? K : never]: T[K];
};
export type PickPropertyKey2<T, U extends keyof T> = {
  [K in U & PropertyKey]: T[K];
};

/**
 * 合并交叉类型
 * @example
 * type A = { name: string }
 * type B = { age: number }
 * type C = { address: string }
 * type ABC = IntersectionObject1<A & B & C> // { name: string; age: number; address: string;}
 * type UnionAbC = ntersectionObject<A | B | C> // {}
 */
export type IntersectionObject1<T> = Omit<T, never>;

/**
 * 用途同IntersectionObject1
 * }
 */
export type IntersectionObject2<T> = T extends infer O
  ? {
      [K in keyof O]: O[K];
    }
  : never;

/**
 * 检测可选属性1
 * @example
 * type A = {
 *  name?: string
 *  age: number
 * }
 * type B = IsPartialKey1<A, 'age'> // false
 * type C = IsPartialKey1<A, 'name'> // true
 * type D = IsPartialKey1<A, 'name' | 'age'> // false
 * 用{}检测语义不够好，建议还是用 IsPartialKey2
 */
export type IsPartialKey1<T, K extends keyof T> = {} extends Pick<T, K>
  ? true
  : false;

/**
 * 检测可选属性2
 * @example
 * type A = {
 *  name?: string
 *  age: number
 * }
 * type B = IsPartialKey2<A, 'age'> // false
 * type C = IsPartialKey2<A, 'name'> // true
 * type D = IsPartialKey2<A, 'name' | 'age'> // true
 */
export type IsPartialKey2<T, K extends keyof T> = T[K] extends Required<T>[K]
  ? false
  : true;

/**
 * @description 是否必选属性
 * type cases = [
 *  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
 *  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
 *  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
 *  Expect<Equal<IsRequiredKey<{ a: undefined; b?: string }, 'a'>, true>>
 * ]
 */
export type IsRequiredKey<Type, Keys extends keyof Type> = Pick<
  Type,
  Keys
> extends Required<Pick<Type, Keys>>
  ? true
  : false;
/**
 * 检测必选属性
 * type cases = [
 *  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
 *  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
 * ]
 */
export type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};

/**
 * 检测可选属性
 * @example
 * type cases = [
 *  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
 *  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
 * ]
 */
export type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};

/**
 * 检测必选属性
 * @example
 * type cases = [
 *   Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
 *   Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
 *   Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
 *   Expect<Equal<RequiredKeys<{}>, never>>,
 * ]
 */
export type RequiredKeys<T, K extends keyof T = keyof T> = K extends keyof T
  ? T[K] extends Required<T>[K]
    ? K
    : never
  : never;

/**
 * 检测可选属性
 * @example
 * type cases = [
 *   Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
 *   Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
 *   Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
 *   Expect<Equal<OptionalKeys<{}>, never>>,
 * ]
 */
export type OptionalKeys<T, K extends keyof T = keyof T> = K extends keyof T
  ? T[K] extends Required<T>[K]
    ? never
    : K
  : never;

/**
 * 检测是否非联合类型
 * @example
 * type A = IsTuple<string> // true
 * type B = IsTuple<string | number> // false
 */
export type IsNoUnion<T, C = T> = (
  T extends T ? (C extends T ? true : false) : never
) extends true
  ? true
  : false;

/**
 * 检测是否联合类型
 * @example
 * type A = IsUnion<string> // false
 * type B = IsUnion<string | number> // true
 */
export type IsUnion<T> = IsNoUnion<T> extends true ? false : true;

/**
 * 数字类型转为联合类型
 * @example
 * type A = ArrayToUnion<string | number> // string | number
 */
export type ArrayToUnion<T extends unknown[]> = T[number];
export type ArrayToUnion1<T extends unknown[]> = T extends Array<infer R>
  ? R
  : never;

/**
 * 对象类型转为联合类型
 * @example
 * type A = ObjectToUnion<{ a: string, b: number }> // string | number
 */
export type ObjectToUnion<T extends object> = T[keyof T];

/**
 * 是否元祖类型
 * @example
 * IsTuple<[]> // true
 * IsTuple<[number]> // true
 * IsTuple<readonly [1]> // true
 * IsTuple<{ length: 1 }> // false
 * IsTuple<number[]> // false
 * IsTuple<never> // false
 */
export type IsTuple<T> = [T] extends [never]
  ? false
  : T extends ReadonlyArray<unknown>
  ? number extends T["length"]
    ? false
    : true
  : false;

/**
 * 是否never类型
 * @example
 * IsNever<never> // true
 * IsNever<never | string> // false
 * IsNever<''> // false
 * IsNever<undefined> // false
 * IsNever<null> // false
 * IsNever<[]> // false
 * IsNever<{}> // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * 翻转元祖类型
 * @example
 * type cases = [
 *  Expect<Equal<Reverse<[]>, []>>,
 *  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
 *  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
 * ]
 * type errors = [
 *  // @ts-expect-error
 *  Reverse<'string'>,
 *  // @ts-expect-error
 *  Reverse<{ key: 'value' }>,
 * ]
 */

export type Reverse<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : T;

/**
 * 字符串转联合类型
 * @example
 * type cases = [
 *  Expect<Equal<StringToUnion<''>, never>>,
 *  Expect<Equal<StringToUnion<'t'>, 't'>>,
 *  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
 *  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
 * ]
 */
export type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

/**
 * 联合类型转元组类型
 * @example
 * https://catchts.com/union-array#:~:text=Let%27s%20say%20you%20have%20a%20Union%2C%20and%20you,%22one%22%2C%20%22one%22%5D%20%3F%20true%20%3A%20false%3B%20%2F%2F%20true
 */
export type UnionToArray<T, A extends unknown[] = []> = IsUnion1<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

// Converts union to overloaded function
export type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

export type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void
  ? A
  : never;

export type IsUnion1<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/**
 * 数组中是否包含指定类型
 */
export type Includes<T, U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

/**
 * 类型是否已定义（非unknown）
 */
export type HasDefined<T> = Equal<T, unknown> extends true ? false : true;

/**
 * @desription 获取只读key
 * interface Todo1 {
 *   readonly title: string
 *   description: string
 *   completed: boolean
 * }
 * interface Todo2 {
 *   readonly title: string
 *   readonly description: string
 *   completed?: boolean
 * }
 * type cases = [
 *  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
 *  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
 * ]
 */
export type GetReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { [P in K]: T[K] } ? 1 : 2) extends <
    U
  >() => U extends { readonly [P in K]: T[K] } ? 1 : 2
    ? K
    : never;
}[keyof T];

/**
 * @example
 * type cases = [
 *   Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
 *   Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
 *   Expect<
 *     Equal<
 *       MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
 *       "a" | "c" | "d"
 *     >
 *   >,
 *   Expect<Equal<MutableKeys<{}>, never>>
 * ];
 *
 */
export type MutableKeys<T> = keyof {
  [K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
    ? never
    : K]: any;
};

/**
 * @description 将类型为字面类型（标签类型）的属性，转换为基本类型
 * @example type cases = [
 *  Expect<Equal<ToPrimitive<'title'>, string>>,
 *  Expect<Equal<ToPrimitive<1>, number>>,
 *  Equal<ToPrimitive<'title'| 1>, string | number>,
 *  Expect<Equal<ToPrimitive<false>, boolean>>,
 *  Expect<Equal<ToPrimitive<()=>void>, Function>>,
 *  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
 * ]
 * type PersonInfo = {
 *  name: 'Tom'
 *  age: 30
 *  married: false
 *  addr: {
 *    home: '123456'
 *    phone: '13111111111'
 *  }
 *  hobbies: ['sing', 'dance']
 *  readonlyArr: readonly ['test']
 *  fn: () => any
 * }
 * type ExpectedResult = {
 *   name: string
 *   age: number
 *   married: boolean
 *   addr: {
 *     home: string
 *     phone: string
 *   }
 *   hobbies: [string, string]
 *   readonlyArr: readonly [string]
 *   fn: Function
 * }
 */
export type ToPrimitive<T> = T extends object
  ? T extends (...args: never[]) => unknown
    ? Function
    : {
        [K in keyof T]: ToPrimitive<T[K]>;
      }
  : T extends { valueOf: () => infer R }
  ? R
  : T;

/**
 * @description Convert a string literal to a number, which behaves like `Number.parseInt`.
 * @example
 * type cases = [
 *  Expect<Equal<StringToNumber<'0'>, 0>>,
 *  Expect<Equal<StringToNumber<'5'>, 5>>,
 *  Expect<Equal<StringToNumber<'12'>, 12>>,
 *  Expect<Equal<StringToNumber<'27'>, 27>>,
 *  Expect<Equal<StringToNumber<'18@7_$%'>, never>>,
 * ]
 */
export type StringToNumber<S extends string> =
  S extends `${infer T extends number}` ? T : never;

/**
 * @description 返回数组索引的 联合类型
 * @example
 * type cases = [
 *  Expect<Equal<TupleKeys<[3, 4]>, 0 | 1>>,
 * ]
 */
export type TupleKeys<T extends readonly unknown[]> = T extends readonly [
  infer Head,
  ...infer Tail
]
  ? TupleKeys<Tail> | Tail["length"]
  : never;

/**
 * @description 获取union类型中最后一个类型
 * @example LastInUnion<1 | 2> = 2
 * @from https://github.com/type-challenges/type-challenges/issues/737
 */
export type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

/**
 * @description 联合类型转元组
 * UnionToTuple<1 | 2> = [1, 2].
 * @example
 * type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]
 * type cases = [
 *   Expect<Equal<UnionToTuple<1 | 2>, [1, 2]>>
 *   Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
 *   Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
 * ]
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

/**
 * @description 获取字符串长度
 * @example
 * type cases = [
 *   Expect<Equal<LengthOfString<"foo">, 3>>
 * ]
 */
export type LengthOfString<
  S extends string,
  A extends any[] = []
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...A, F]>
  : A["length"];

/**
 * @description
 * @example
 * interface Model {
 *   name: string
 *   age: number
 *   locations: string[] | null
 * }
 *
 * type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]
 *
 * type cases = [
 *   Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
 * ]
 */

export type ObjectFromEntries<T extends [string, any]> = {
  [K in T[0]]: T extends [K, any] ? T[1] : never;
};

/**
 * @description 判断是否负数
 * @example
 * type cases = [
 *   Expect<Equal<IsNegativeNumber<0>, false>>,
 *   Expect<Equal<IsNegativeNumber<number>, never>>,
 *   Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
 *   Expect<Equal<IsNegativeNumber<-1>, true>>,
 *   Expect<Equal<IsNegativeNumber<-1.9>, true>>,
 *   Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
 *   Expect<Equal<IsNegativeNumber<1>, false>>,
 *   Expect<Equal<IsNegativeNumber<1.9>, false>>,
 *   Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
 * ]
 */
export type IsNegativeNumber<
  T extends number,
  U extends T = T
> = number extends T
  ? never
  : T extends U
  ? [U] extends [T]
    ? `${T}` extends `-${infer _}`
      ? true
      : false
    : never
  : never;

