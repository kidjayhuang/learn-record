/**
 * vue2.7 源码 PropType 类型分析
 * vue/types/options.d.ts
 */
import type { Debug, Equal, Expect } from "@type-challenges/utils";

// ---------------
export type Prop<T> =
  | { (): T }
  | { new (...args: never[]): T & object }
  | { new (...args: string[]): Function };

export type PropType<T> = Prop<T> | Prop<T>[];
/**
 * 使用示例
 * content: {
    type: String as PropType<string>,
  }
 */
// ---------------
/**
 * Prop的类型是什么意思，可以看看以下的例子
 */
type PropConstructor1<T = any> = { new (...args: any[]): T } | { (): T };
type t1 = StringConstructor extends PropConstructor1<infer R> ? R : any; // string | String

type t2 = StringConstructor extends { new (...args: any[]): infer R } | { (): infer R } ? R : any; // string | String
type t3 = StringConstructor extends { new (...args: any[]): infer R } ? R : any; // String
type t4 = StringConstructor extends { (): infer R } ? R : any; // string

/**
 * t1、t2的类型一致，只是写法不同，因为ts类型推断，遇到多个infer R时，会分别推断，然后组合
 * 将t2拆分为t3跟t4两个类型
 * 
 * 已知原生的 StringConstructor 类型为：
 * interface StringConstructor {
    new(value?: any): String;
    (value?: any): string;
    readonly prototype: String;
    fromCharCode(...codes: number[]): string;
 * }
 * 所以 t3 类型是 String，t4类型是string
 *
*/

/**
 * 再看下一个例子
 */
type PropConstructor5<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T };
type t5 = StringConstructor extends PropConstructor5<infer R> ? R : any; // string

/**
 * 只是多了一个 & object，就推断不出String了，这是为什么呢？
 * 其中涉及到 权重 的因素，具体计算公式不清楚，只知道使用交叉类型，加了 & object 就会降低权重，导致infer R推断不出String，写 & 1，& string 也是一样的效果
 * 
 * @reference https://stackoverflow.com/questions/66399533/typescript-infer-generic-param-types-with-union
 */
