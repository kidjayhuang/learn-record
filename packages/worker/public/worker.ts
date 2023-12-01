/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-04 14:09:29
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-04 15:32:55
 */
// worker.js
// importScripts('https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js')
importScripts('test.js')

onmessage = async (event) => {
  console.log(`Message received in worker: ${event.data}`);
  // for (let i = 0; i < 100000; i++) {
  //   console.log(i);
  // }
  
  // fetch('https://www.baidu.com')
  // .then(response => response.text())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));

  postMessage('Hello, main!');
};