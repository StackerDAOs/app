const withTM = require('next-transpile-modules')([
  'ui',
  'utils',
  'api',
  'hooks',
  'sdk',
]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
});
