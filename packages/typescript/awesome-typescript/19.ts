

/**
 * 第十九题
 * https://github.com/semlinker/awesome-typescript/issues/38
 */
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

type OptionalKeys<T> = keyof {
  [P in keyof T as undefined extends T[P] ? P : never]: T[P];
};

// type OptionalKeys<T> = NonNullable<{
//   [P in keyof T]: undefined extends T[P] ? P : never;
// }[keyof T]>;

type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"


export {};