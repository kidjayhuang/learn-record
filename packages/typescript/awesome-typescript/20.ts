/**
 * 第二十题
 * https://github.com/semlinker/awesome-typescript/issues/39
 */
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, infer B, ...infer C]
  ? (arg: A) => Curry<(...args: [B, ...C]) => R>
  : F;

type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date


export {};