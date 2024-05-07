console.log("start");
setTimeout(() => {
    console.log("children2")
    Promise.resolve().then(() =>{
        console.log("children3")
    })
}, 0)

new Promise(function(resolve, reject){
    console.log("children4")
    setTimeout(function(){
        console.log("children5")
        resolve("children6")
    }, 0)
}).then(res =>{         // flag
    console.log("children7")
    setTimeout(() =>{
        console.log(res)
    }, 0)
})

// start children4 children2 children3  children5  children7 children6
/**
 *  首先开始主任务中的第一轮宏任务，输出start，遇到 setTimeout 不需要等待 0s 而是直接丢入宏任务队列(有人说需要等待 0s再放入到任务队列是不对的，可以使用console.time/timeEnd来测试)，遇到promise立即执行输出children4，又遇到一个setTimeout 直接又丢入到宏任务队列，第一轮宏任务执行完，且没有微任务。问：上面的 .then() (注释的flag处) 是第一轮宏任务循环的微任务吗？不是！因为resolve 都没有执行，promise 的状态都还没有从pending改变，就不是第一轮的微任务。
 *  开始下一轮的宏任务执行第一个进入的 setTimeout，输出children2,第二轮宏任务结束，开始微任务执行promise 中的.then() 输出 children3。第二轮循环结束
 *  接着又开始setTimeout 的宏任务，输出children5，微任务输出 children7。这里遇到一个宏任务 setTimeout，丢入宏任务队列。
 *
 */