
/**
 * 第二十一题
 * https://github.com/semlinker/awesome-typescript/issues/40
 */
type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

type Merge<FirstType, SecondType> = {
  [K in keyof (FirstType & SecondType)]: K extends keyof SecondType
    ? SecondType[K]
    : K extends keyof FirstType
    ? FirstType[K]
    : never;
};

//  type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> & SecondType

const ab: Merge<Foo, Bar> = { a: 1, b: 1 };


export {};