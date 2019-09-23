module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './main.js'
  },
  target: 'web',
  output: {
    path: `${process.cwd()}/dist`,
    filename: '[name].js'
  }
};