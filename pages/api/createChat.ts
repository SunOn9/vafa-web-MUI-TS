import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './connectDB';
import { Db } from 'mongodb'

type Chat = {
    userId: string
    question: string
    answer: string
    createdAt: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {userId ,question ,answer ,createdAt} : Chat = req.body

    if (!userId || !question || !answer || !createdAt) {
        res.status(400).json({ message: 'Invalid request body' })
        return
    }

    const db : Db = await connectToDatabase();

    try {
        const result = await db.collection('chats').insertOne({
            userId,
            createdAt,
            question,
            answer,
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
