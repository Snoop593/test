const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
global.window = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
module.exports = [{
  entry: ['babel-polyfill', './src/client/index.js'],
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ]
      }
    ], 
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, 'src'),
      actions: path.resolve(__dirname, 'src/actions/'),
      components: path.resolve(__dirname, 'src/components/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
    }
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: 'bundle.js'
  },
},
{
  target: 'node',
  entry: ['babel-polyfill', './src/server.js'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ]
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ]
      }
    ], 
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, 'src'),
      actions: path.resolve(__dirname, 'src/actions/'),
      components: path.resolve(__dirname, 'src/components/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: './static/[name].css',
      chunkFilename: './static/[id].css'
    }),
    new webpack.ProvidePlugin({
        React: 'react'
    })
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    globalObject: 'root',
    filename: 'server.js'
  },
}
];