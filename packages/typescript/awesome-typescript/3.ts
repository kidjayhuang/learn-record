/**
 * 第三题
 * https://github.com/semlinker/awesome-typescript/issues/21
 */
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: MyPartial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
type MyPartial<T> = {
  [P in keyof T]+?: T[P];
};

type Foo3 = {
  a: number;
  b?: string;
  c: boolean;
};
type SetOptional<T, Keys extends keyof T = keyof T> = {
  [K in Keys]+?: T[K];
} & Omit<T, Keys> extends infer O
  ? {
      [K in keyof O]: O[K];
    }
  : never;

// type SetOptional<T, K extends keyof T> = Omit<T, K> &
//   Partial<Pick<T, K>> extends infer O
//   ? {
//       [K in keyof O]: O[K];
//     }
//   : never;

// 测试用例
type SomeOptional = SetOptional<Foo3, "a" | "b">;

type Foo31 = {
  a?: number;
  b: string;
  c?: boolean;
};
type SetRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>> extends infer O
  ? {
      [K in keyof O]: O[K];
    }
  : never;
// 测试用例
type SomeRequired = SetRequired<Foo31, "b" | "c">;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }


export {};