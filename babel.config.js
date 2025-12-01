module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './app',
            '@components': './app/components',
            '@screens': './app/screens',
            '@services': './app/services',
            '@context': './app/context',
            '@hooks': './app/hooks',
            '@types': './app/types',
            '@utils': './app/utils',
            '@navigation': './app/navigation',
            '@styles': './app/styles',
            '@animations': './app/animations',
            '@assets': './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
