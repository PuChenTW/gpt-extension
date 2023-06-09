const path = require("path");
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    content: path.resolve('src/content/index.tsx'),
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
    path: path.join(__dirname, '..', 'extension')
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        output: {
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      }
    })],
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};