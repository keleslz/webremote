const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');

console.log('remote')

module.exports = (context) => {
  const result = {
    ...context, 
    entry: './src/index',
    mode: 'development',
    devServer: {
      static: path.join('dist'),
      port: 4201,
      onListening: () => context.devServer.onListening
    },
    output: {
      publicPath: 'auto',
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
      new ModuleFederationPlugin({
        name: 'remote',
        library: { type: 'var', name: 'remote' },
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/app/app.tsx'
        },
        shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
      }),
      
    new ExternalTemplateRemotesPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
  };

  return result;
}