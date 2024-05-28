const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'app_general',
        filename: 'about.js',
        remotes: {
          about_exposes: 'about_exposes@http://localhost:8082/about.js',
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
      new webpack.container.ModuleFederationPlugin({
        name: 'app_general',
        filename: 'hello.js',
        remotes: {
          hello_exposes: 'hello_exposes@http://localhost:8082/hello.js',
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
