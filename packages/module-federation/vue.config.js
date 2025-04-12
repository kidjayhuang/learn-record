const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
console.log('-------------env------------', process.env.NODE_ENV);
const isBuild = process.env.NODE_ENV === 'production'
const port = 8082
module.exports = defineConfig({

  pages: {
    index:  './src/index.ts',
  },
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'hello_exposes',
        filename: 'hello.js',
        exposes: {
          './HelloWorld': './src/remote-modules/HelloWorld.vue',
        },
        // remotes: {
        //   hello_exposes:  `promise new Promise(resolve => {
        //           const script = document.createElement('script')
        //           script.src = "http://127.0.0.1/hello.js"
        //           script.async = true
        //           // script.defer = true
        //           script.onload = () => {
        //             const proxy = {
        //               get(request) {
        //                 return window.hello_exposes.get(request)
        //               },
        //               init(arg) {
        //                 return window.hello_exposes.init(arg)
        //               }
        //             }
        //             resolve(proxy)
        //           }
        //           (document.body || document.head).appendChild(script)
        //   })`,
        // },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
});
