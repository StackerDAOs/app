const withTM = require('next-transpile-modules')(['ui', 'utils', 'api']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    STACKS_NETWORK: process.env.STACKS_NETWORK,
  },
});
