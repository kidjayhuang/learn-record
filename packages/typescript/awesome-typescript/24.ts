
/**
 * 第二十四题
 * https://github.com/semlinker/awesome-typescript/issues/43
 *
 * extends infer O ? {[K in keyof O]: O[K]}: never; 这一段是为了vscode中把鼠标移至mutableFoo时能直观看到类型
 */
type Foo2 = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};

type Mutable<T, Keys extends keyof T = keyof T> = {
  -readonly [K in Keys]: T[K];
} & Pick<T, Exclude<keyof T, Keys>> extends infer O
  ? {
      [K in keyof O]: O[K];
    }
  : never;

const mutableFoo: Mutable<Foo2, "a"> = { a: 1, b: "2", c: true };

mutableFoo.a = 3; // OK
mutableFoo.b = "6"; // Cannot assign to 'b' because it is a read-only property.


export {};