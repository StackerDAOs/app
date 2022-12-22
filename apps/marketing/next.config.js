const withTM = require('next-transpile-modules')([
  'ui',
  'utils',
  'api',
  'hooks',
]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
});
