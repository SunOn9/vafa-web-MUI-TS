import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './connectMongoDB';

type User = {
    id?: number
    email: string
    password: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {email, password} : User = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Invalid request body' })
        return
    }

    const client : any = await connectToDatabase();
    const db = client.db('test');

    try {
        const result = await db.collection('user').insertOne({
            email,
            password
        });

        const {id} : User = result._id;

        res.status(201).json({id: id});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
