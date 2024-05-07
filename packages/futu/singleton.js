/**
 * 实现一个单例类
 */

class Singleton {
  constructor() {
    if (typeof Singleton.instance === "object") {
      return Singleton.instance;
    }
    Singleton.instance = this;
    return this;
  }
  // 其他方法
}
let instance = null
class Singleton1 {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    return this;
  }
  // 其他方法
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
