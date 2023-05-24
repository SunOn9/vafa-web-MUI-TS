import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './connectDB';
import {Db} from 'mongodb'

type User = {
    id?: number
    email: string
    password?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {email} : User = req.body

    const db : Db = await connectToDatabase();

    const result = await db.collection('user').findOne({
       "email" : email
    });
    
    res.status(200).json(result);
}
