/**
 * 通过interface来重载函数，函数的参数必须继承原有的函数参数，只能在上面做扩展
 */
interface Func {
  // 定义与函数接收两个必选参数都是 number 类型，以及一个可选的字符串参数desc，这个函数不返回任何值
  (x: number, y: number, desc?: string): void;
  (x: number, y: number): void;
  //   (x: number, y: number, z: number): void; // 与第一种情况不兼容
  (x: number, y: number, desc: string, s: string, as: number): void; // 与第一种情况兼容
}
const sum1: Func = function (x, y, desc = "") {
  // const sum: Func = function (x: number, y: number, desc: string): void
  // ts 类型系统默认推论可以不必书写上述类型定义
  console.log(desc, x + y);
};
const sum2: Func = function (x, y) {
  // const sum: Func = function (x: number, y: number, desc: string): void
  // ts 类型系统默认推论可以不必书写上述类型定义
  console.log(x + y);
};
sum1(32, 22);
sum2(32, 22);

/**
 *
 * function 的方式重载函数，函数参数不必相互继承
 *
 */
function add(arg1: string, arg2: string): string;
function add(arg1: number, arg2: number): number;
// 实现：
function add(arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === "string" && typeof arg2 === "string") {
    return arg1 + arg2;
  } else if (typeof arg1 === "number" && typeof arg2 === "number") {
    return arg1 + arg2;
  }
}

class AA {
  // class 定义的类，既是其生成实例的类型，本身又是构造函数
}
type SS = AA;
const a: SS = new AA();



// from https://mp.weixin.qq.com/s/rx-FYjUog12v9CqcOsWGEg
// 定义一个泛型接口 IPerson表示一个类，它返回的实例对象取决于使用接口时传入的泛型T
interface IPerson<T> {
  // 因为我们还没有讲到unknown 所以暂时这里使用any 代替
  new (...args: unknown[]): T;
}

function getInstance<T>(Clazz: IPerson<T>) {
  return new Clazz();
}

// use it
class Person {}

type ss = typeof Person extends IPerson<unknown> ? true : false;

// TS推断出函数返回值是person实例类型
const person = getInstance(Person); // 相当于 getInstance<Person>(Person);


// 声明一个接口IPerson代表函数
interface IPerson1 {
  // 此时注意泛型是在函数中参数 而非在IPerson接口中
  <T>(a: T): T;
}

// 函数接受泛型
const getPersonValue: IPerson1 = <T>(a: T): T => {
  return a;
};

// 相当于getPersonValue<number>(2)
getPersonValue(2);


// 定义callback遍历方法 两种方式 应该采用哪一种？
// type Callback = <T>(item: T) => void
// 第二种声明方式(答案)
type Callback<T> = (item: T) => void;

const forEach = <T>(arr: T[], callback: Callback<T>) => { 
  for (let i = 0; i < arr.length - 1; i++) {  
    callback(arr[i]) 
  }
};

forEach(['1', 2, 3, '4'], (item) => {});


export {};


let aa: { a: string; b: number };
let b: { a: string };

b = aa!

let fn1!: (a: string, b: number) => void;
let fn2: (a: string, b: number, c: boolean) => void;


fn2 = fn1; // 正确，被允许

fn2('1', 1, true)



type a = ['a',1,true]
type ArrayToUnion<T extends any[]> = T extends Array<infer R> ? R : never 
type s1s = ArrayToUnion<a>

