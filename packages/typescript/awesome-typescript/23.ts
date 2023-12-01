

/**
 * 第二十三题
 * https://github.com/semlinker/awesome-typescript/issues/42
 */
interface Foo1 {
  [key: string]: any;
  [key: number]: any;
  bar(): void;
}

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

type FooWithOnlyBar = RemoveIndexSignature<Foo1>; //{ bar: () => void; }


export {};