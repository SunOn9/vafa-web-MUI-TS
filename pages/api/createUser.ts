import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './connectDB';
import { Db } from 'mongodb'

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

    if (!email|| !password) {
        res.status(400).json({ message: 'Invalid request body' })
        return
    }

    const db : Db = await connectToDatabase();

    try {
        const result = await db.collection('user').insertOne({
            email,
            password
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
