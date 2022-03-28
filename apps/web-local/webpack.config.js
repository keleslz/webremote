const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (context) => {
  console.log('local')

  const result = {
    ...context,
    entry: "./src/index.ts",
    mode: "development",
    cache: false,
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    target: 'web',
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 4200,
      onListening: () => context.devServer.onListening,
      hot: true,
    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "local",
        remotes: {
          web_remote: 'web_remote@//localhost:4201/remoteEntry.js',
          remote_app: 'remote_app@//localhost:4202/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "17.0.2"
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "17.0.2"
          }
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ['main']
      }),
    ]
  };

  return result;
}