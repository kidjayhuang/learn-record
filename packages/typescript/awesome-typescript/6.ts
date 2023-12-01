
/**
 * 第六题
 * https://github.com/semlinker/awesome-typescript/issues/24
 */
type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K];
  }[number];
  // 测试用例：
  type NaiveResult = DeepFlat<[["a"], ["b", ["c"]], ["d"]]>;
  // NaiveResult的结果： "a" | "b" | "c" | "d"
  

export {};