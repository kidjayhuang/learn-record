/**
 * 第五题
 * https://github.com/semlinker/awesome-typescript/issues/23
 */
type Fn = (a: number, b: string) => number;
// 使用Parameters、ReturnType
// type AppendArgument<F extends (...args: any) => any, A> = (
//   x: A,
//   ...arg: Parameters<F>
// ) => ReturnType<F>;

// 使用infer
type AppendArgument<F, A> = F extends (...args: infer Args) => infer R
  ? (x: A, ...arg: Args) => R
  : never;

type FinalFn = AppendArgument<Fn, boolean>;
// (x: boolean, a: number, b: string) => number


export {};