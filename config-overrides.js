const webpack = require('webpack')

module.exports = function override(config, env) {
  // Loader for .clar files
  let rules = config.module.rules[1].oneOf
  rules.splice(rules.length - 1, 0, {
    test: /\.clar$/i,
    use: 'raw-loader',
  })

  // Dependency fallback management
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer'),
  });
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ];

  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/];  // gets rid of a billion source map warnings
  return config;
}
