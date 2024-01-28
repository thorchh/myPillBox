import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
            const response = await fetch('http://34.71.115.165/predict', {
                method: 'POST',
                body: JSON.stringify(req.body),
            });

            const data = await response.json();
            res.status(200).json(data);
    } else {
        // Handle any other HTTP method
    }
}