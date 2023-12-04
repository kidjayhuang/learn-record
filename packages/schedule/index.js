// JavaScript 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善代码中 Scheduler 方法，使得以下程序能正确输出。

// -----------------mock一些请求
const request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

const request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
const request3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300);
  });
const request4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 400);
  });
// -----------------最多并发2个请求
function scheduler(max) {
  const tasks = [];
  const usingTask = []; // 正在运行的任务

  return (promiseCreator) => {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve;
      if (usingTask.length < max) {
        usingRun(promiseCreator);
      } else {
        tasks.push(promiseCreator);
      }
    });
  };

  function usingRun(promiseCreator) {
    usingTask.push(promiseCreator);
    promiseCreator().then((res) => {
      promiseCreator.resolve(res);
      let index = usingTask.findIndex(promiseCreator);
      usingTask.splice(index, 1);
      if (tasks.length > 0) {
        usingRun(tasks.shift());
      }
    });
  }
}


const addRequest = scheduler(2);
addRequest(request1).then((res) => {
  console.log(res);
});
addRequest(request2).then((res) => {
  console.log(res);
});
addRequest(request3).then((res) => {
  console.log(res);
});
addRequest(request4).then((res) => {
  console.log(res);
});
