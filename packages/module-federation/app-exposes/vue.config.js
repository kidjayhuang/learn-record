const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  publicPath: 'auto',
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
          './HelloWorld.vue': './src/components/HelloWorld.vue',
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
          './AboutView.vue': './src/views/AboutView.vue',
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
