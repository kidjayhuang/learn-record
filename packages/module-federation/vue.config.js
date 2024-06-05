const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
console.log('-------------env------------', process.env.NODE_ENV);
const isBuild = process.env.NODE_ENV === 'production'
const port = 8082
module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  devServer: {
    host: "0.0.0.0",
    port,
  },
  publicPath: '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'hello_exposes',
        filename: 'hello.js',
        exposes: {
          './HelloWorld.vue': './src/remote-modules/HelloWorld.vue',
        },
        remotes: {
          hello_exposes: `hello_exposes@http://localhost:${port}/hello.js`,
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),

      new webpack.container.ModuleFederationPlugin({
        name: 'about_exposes',
        filename: 'about.js',
        exposes: {
          './AboutView.vue': './src/remote-modules/AboutView.vue',
        },
        remotes: {
          about_exposes: `about_exposes@http://localhost:${port}/about.js`,
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),

    ],
  },
  transpileDependencies: true,
});
