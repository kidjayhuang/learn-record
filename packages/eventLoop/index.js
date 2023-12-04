// async function test() {
//   for (let i = 0; i < 3; i++) {
//     setTimeout(() => {
//       console.log("time", i);
//     });
//     await new Promise((resolve) => {
//       console.log("promise", i);
//       resolve();
//     }).then(() => {
//       console.log("resolve", i);
//     });
//     console.log("for", i);
//   }
//   return "done";
// }
// test().then(console.log);

// promise 0
// resolve 0
// for 0
// promise 1
// resolve 1
// for 1
// promise 2
// resolve 2
// for 2
// done
// time 0
// time 1
// time 2


// ------- //
async function test() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("time", i);
    });
    new Promise((resolve) => {
      console.log("promise", i);
      resolve();
    }).then(() => {
      console.log("resolve", i);
    });
    console.log("for", i);
  }
  return "done";
}
test();
// promise 0
// for 0
// promise 1
// for 1
// promise 2
// for 2
// resolve 0
// resolve 1
// resolve 2
// time 0
// time 1
// time 2
