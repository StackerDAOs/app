const withTM = require('next-transpile-modules')(['ui', 'utils', 'api']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NODE: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    SUP: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
});
