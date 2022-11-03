import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleIdeaVote } from 'api/clubs/mutations';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' });
  } else {
    const userSession = session.user as any;
    const response = await handleIdeaVote({
      idea_id: req.query?.id,
      direction: 1,
      user_address: userSession.address,
    });
    console.log(response);

    res.status(200).json({ message: 'Success' });

    // if (submitIdea.isSuccess) {
    //   res.status(200).json({ message: 'Success' });
    // } else {
    //   res.status(500).json({ message: 'Error', error: submitIdea.error });
    // }
  }
};
