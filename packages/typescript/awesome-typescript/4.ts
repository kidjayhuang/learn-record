/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-01 11:46:55
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-01 13:38:21
 */
/**
 * 第四题
 * https://github.com/semlinker/awesome-typescript/issues/22
 */
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};


interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}
type ConditionalPick<T, V extends T[keyof T]> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
} 
// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}


export {};