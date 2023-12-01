

/**
 * 第十题
 * https://github.com/semlinker/awesome-typescript/issues/28
 */
type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

type Trim<V extends string> = TrimLeft<TrimRight<V>>;

// 测试用例
var t: Trim<" semlinker ">;
//=> 'semlinker'


export {};