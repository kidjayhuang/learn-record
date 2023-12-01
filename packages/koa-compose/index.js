"use strict";

/**
 * Expose compositor.
 */

module.exports = compose;

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

// function compose(middleware) {
//   if (!Array.isArray(middleware))
//     throw new TypeError("Middleware stack must be an array!");
//   for (const fn of middleware) {
//     if (typeof fn !== "function")
//       throw new TypeError("Middleware must be composed of functions!");
//   }

//   /**
//    * @param {Object} context
//    * @return {Promise}
//    * @api public
//    */

//   return function (context, next) {
//     // last called middleware #
//     let index = -1;
//     return dispatch(0);
//     function dispatch(i) {
//       if (i <= index)
//         return Promise.reject(new Error("next() called multiple times"));
//       index = i;
//       let fn = middleware[i];
//       if (i === middleware.length) fn = next;
//       if (!fn) return Promise.resolve();
//       try {
//         return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//   };
// }

const middleware = [];
let mw1 = async function (ctx, next) {
  console.log("next前，第一个中间件");
  await next();
  console.log("next后，第一个中间件");
};
let mw2 = async function (ctx, next) {
  console.log("next前，第二个中间件");
  await next();
  console.log("next后，第二个中间件");
};
let mw3 = async function (ctx, next) {
  console.log("第三个中间件，没有next了");
};

function compose(middlewares) {
  return function (context, next) {
    return dispatch(0);
    function dispatch(i) {
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next; // 针对最后一个中间件，调用定制传的最后一个next
      if(!fn) return Promise.resolve() // 针对最后一个next函数，入参next为空promise
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    }
  };
}

// function compose(middlewares) {
//   return (context, next) => {
//     return dispatch(0);
    
//     function dispatch(index) {
//       if (index === middlewares.length) {
//         return Promise.resolve();
//       }
//       const fn = middlewares[index];

//       return Promise.resolve(fn(context, dispatch.bind(null, index + 1)));
//     }
//   };
// }

function use(mw) {
  middleware.push(mw);
}
use(mw1);
use(mw2);
use(mw3);

const fn = compose(middleware);

fn();
