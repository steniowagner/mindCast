module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
          'babel-plugin-root-import',
          {
            rootPathSuffix: 'src',
          },
        ],
      ],
    },
  },
};
