
/**
 * 第十八题
 * https://github.com/semlinker/awesome-typescript/issues/37
 * *** 理解不了
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// 测试用例
type U0 = UnionToIntersection<string | number>; // never
type U1 = UnionToIntersection<{ name: string } | { age: number }>; // { name: string; } & { age: number; }


export {};