// pages/api/startups.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function startupsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const token = req.headers.authorization as string;
    //console.log(token);

    const response = await fetch('http://localhost:8080/startups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
}