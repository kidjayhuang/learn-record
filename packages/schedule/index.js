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
  // ------你的代码
}

const addRequest = scheduler(2);
addRequest(request1).then(res => {
  console.log(res);
});
addRequest(request2).then(res => {
  console.log(res);
});
addRequest(request3).then(res => {
  console.log(res);
});
addRequest(request4).then(res => {
  console.log(res);
});