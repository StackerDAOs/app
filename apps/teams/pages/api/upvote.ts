import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleIdeaVote } from 'api/clubs/mutations';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' });
  } else {
    const response = await handleIdeaVote({
      idea_id: req.body?.idea_id,
      direction: req.body?.direction,
      user_address: '0x',
    });
    res.status(200).json({ message: 'Success', response });
  }
};
