import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './connectDB';
import {Db} from 'mongodb'

type chat = {
    userId: string,
    createdAt?: string,
    question?: string,
    answer?: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const query = req.body;
    

    const db : Db = await connectToDatabase();

    const result = await db.collection('chats')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

    res.status(200).json(result);
}
