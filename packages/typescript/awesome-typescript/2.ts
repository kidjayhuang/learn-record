
/**
 * 第二题
 * https://github.com/semlinker/awesome-typescript/issues/20
 */
function f(a: string, b: string): string;
function f(a: number, b: number): number;
function f(a: string | number, b: string | number): string | number {
  if (typeof a === "string" || typeof b === "string") {
    return `${a}${b}`;
  } else {
    return a + b;
  }
}

f(2, 3); // Ok
f(1, "a"); // Error
f("a", 2); // Error
f("a", "b"); // Ok

export {};
