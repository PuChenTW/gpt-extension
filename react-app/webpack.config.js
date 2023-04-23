const path = require("path");
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    options: path.resolve('src/options/index.tsx'),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: 'postcss-loader', // postcss loader needed for tailwindcss
                options: {
                    postcssOptions: {
                        ident: 'postcss',
                        plugins: [tailwindcss, autoprefixer],
                    },
                },
            },
        ],
    },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
};