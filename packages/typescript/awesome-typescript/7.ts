/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-01 11:43:07
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-01 11:43:16
 */
/**
 * 第七题
 * https://github.com/semlinker/awesome-typescript/issues/25
 */
type EmptyObject = {
    [K in PropertyKey]: never;
  };
  
  // 测试用例
  const shouldPass: EmptyObject = {}; // 可以正常赋值
  const shouldFail: EmptyObject = {
    // 将出现编译错误
    // #@ts-expect-error
    prop: "TS",
  };
  
  type SomeType = {
    prop: string;
  };
  type Exclusive<T1, T2 extends T1> = {
    [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
  };
  // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
  function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
    return x;
  }
  
  // 测试用例：
  const x = { prop: "a" };
  takeSomeTypeOnly(x); // 可以正常调用
  
  const y = { prop: "a", addditionalProp: "x" };
  takeSomeTypeOnly(y); // 将出现编译错误
  

export {};