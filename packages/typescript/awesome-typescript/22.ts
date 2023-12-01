/**
 * 第二十二题
 * https://github.com/semlinker/awesome-typescript/issues/41
 */
type Responder = {
  text?: () => string;
  json?: () => string;
  secure?: boolean;
};

type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends unknown
  ? Responder & { [K in KeysType]-?: ObjectType[K] }
  : never; // 你的实现代码

// 表示当前类型至少包含 'text' 或 'json' 键
const responder: RequireAtLeastOne<Responder, "text" | "json"> = {
  json: () => '{"message": "ok"}',
  secure: true,
};

// @ts-expect-error 因为没有'text'和'json'中的任何一个，报错
const responder2: RequireAtLeastOne<Responder, "text" | "json"> = {
  secure: true,
};


export {};