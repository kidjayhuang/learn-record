async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

//输出
//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout


/**
 * 这道题的难点在于是 promise2还是 async1 end 先输出。
 * 从全局宏任务之上而下执行时 await async2() 后面的代码 console.log('async1 end') 先进入 promise 中的微任务队列，
 * 最后.then() 中的console.log('promise2') 再进入到 promise 中的微任务队列。
 * 所以再开始下一轮宏任务循环之前先输出了 async1 end 再输出了 promise2。全局中的微任务执行完成开始下一轮宏任务setTimeout 最后输出 setTimeout。
 */




/**
 * 将上一道题目变换一下，求输出
 */
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    new Promise(function (resolve) {
        console.log('promise1');
        resolve();
    }).then(function () {
        console.log('promise2');
    });
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise3');
    resolve();
}).then(function () {
    console.log('promise4');
});
console.log('script end');
// script start, 
// async1 start, 
// promise1, 
// promise3, 
// script end, 
// promise2，
// async1 end，
// promise4, 
// setTimeout

/**
 * 首先开始全局下的宏任务依次输出 script start, async1 start, promise1, promise3, script end。
 * 其中 await async2();，async2() 中.then()的代码先进入到promise的微任务队列，await async2(); 
 * 后面的代码再进入到promise的任务队列，console.log('promise4'); 最后进入到 promise 的任务队列。
 * 全局下的宏任务结束，开始全局下的微任务，promise 的微任务队列中按照队列的先进先出原则依次输出，promise2，async1 end，promise4。
 * 全局微任务结束，开始下一轮的宏任务setTimeout，最终输出 setTimeout。
 */



/**
 * 再来将上面的题目变换一下，求输出
 */
async function async1() {
    console.log('async1 start');
    await async2();
    setTimeout(function() {
        console.log('setTimeout1')  // 这一部分代码会放入到 promise 的微任务队列中。
    },0)
}
async function async2() {
    setTimeout(function() {
        console.log('setTimeout2')
    },0)
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout3');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
// script start
// async1 start
// promise1
// script end
// promise2
// setTimeout3
// setTimeout2
// setTimeout1

/**
 * 按照上面的解析，原理都是一样的，全局下的宏任务执行完成后，开始执行全局下的微任务.then() 中的代码，
 * 最后开始下一轮宏任务的执行，下一轮宏任务是 setTimeout3 先执行，因为是setTimeout3 先加入下一个宏任务队列中的，
 * 再依次加入setTimeout2, setTimeout1到宏任务队列。所以输出的结果是setTimeout3, setTimeout2, setTimeout1
 */