/**
 * 第一题
 * https://github.com/semlinker/awesome-typescript/issues/19
 */
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    // 返回的类型是User，而非T
    id: u.id,
    kind: "customer",
  };
}
makeCustomer({ id: 1, kind: "张三", name: "李四" });

export {};
