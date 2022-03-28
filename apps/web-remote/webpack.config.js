const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  ModuleFederationPlugin
} = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

console.log('remote')

module.exports = (context) => {
  const result = {
    ...context,
    entry: './src/index',
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    devServer: {
      hot: true,
      static: path.join('dist'),
      port: 4201,
      onListening: () => context.devServer.onListening,
      liveReload: false,
    },
    output: {
      publicPath: 'auto',
      clean: true,
    },
    module: {
      rules: [{
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
          plugins: [require.resolve('react-refresh/babel')],
        },
      }, ],
    },
    plugins: [
      // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
      new ModuleFederationPlugin({
        name: 'web_remote',
        // library: { type: 'var', name: 'remote' },
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/app/app.tsx'
        },
        shared: {
          react: {
            singleton: true
          },
          'react-dom': {
            singleton: true
          }
        },
      }),
      new ExternalTemplateRemotesPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunks: ['main'],
      }),
      new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bootstrap\.js$/],
      }),
    ],
  };

  return result;
}
