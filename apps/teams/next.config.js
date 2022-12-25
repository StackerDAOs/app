const withTM = require('next-transpile-modules')([
  'ui',
  'utils',
  'api',
  'hooks',
  'sdk',
  'react-syntax-highlighter',
]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    STACKS_NETWORK: process.env.STACKS_NETWORK,
  },
});
