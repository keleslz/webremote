const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (context) => {
  console.log('local')

  const result = {
    ...context,
    entry: "./src/index",
    mode: "development",
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 4200,
      onListening: () => context.devServer.onListening
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
          remote: `remote@//localhost:4201/remoteEntry.js`,
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
      }),
    ]
  };

  return result;
}