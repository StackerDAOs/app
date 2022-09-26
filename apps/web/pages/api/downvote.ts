import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { downvoteProposal } from 'api/clubs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' });
  } else {
    const id = req.body?.id;
    const response = await downvoteProposal(id);
    res.status(200).json({ message: 'Success', response });
  }
};
