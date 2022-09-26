import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyMessageSignature } from 'ui/components';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Stacks',
      type: 'credentials',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: 'Hello, World!',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        publicKey: {
          label: 'Public Key',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const message =
            'Verify that you own this address by signing this message so that you can vote.';
          const { signature, publicKey } = credentials as {
            signature: string;
            publicKey: string;
          };

          const authURL: URL = new URL(
            process.env.NEXT_PUBLIC_NEXTAUTH_URL as string,
          );

          const payload = {
            message,
            signature,
            publicKey,
          };

          const isValid = verifyMessageSignature({ ...payload });

          if (req?.headers?.host !== authURL.host) {
            return null;
          }

          if (!isValid) {
            return null;
          }

          return {
            id: req?.body?.address,
          };
        } catch (e: any) {
          throw new Error(e);
        }
      },
    }),
  ];

  return NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token }) {
        return token;
      },
    },
  });
}
