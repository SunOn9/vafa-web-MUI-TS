import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db, ConnectOptions } from 'mongodb'

interface User {
firstName: string
lastName: string
email: string
password: string
}

let cachedDb: any = null
const uri = "mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority"

async function connectToDatabase(): Promise<Db> {
if (cachedDb) {
return cachedDb
}

const client = await MongoClient.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
}as ConnectOptions ) 

const db = client.db('test')

cachedDb = db
return db
}

export default async function createUser(
req: NextApiRequest,
res: NextApiResponse,
) {
if (req.method !== 'POST') {
res.status(405).json({ message: 'Method not allowed' })
return
}

const { firstName, lastName, email, password }: User = req.body

// validate the request body

if (!firstName || !lastName || !email || !password) {
res.status(400).json({ message: 'Invalid request body' })
return
}

const db = await connectToDatabase()

try {
const result = await db.collection('users').insertOne({
firstName,
lastName,
email,
password,
})

res.status(201).json(result)
} catch (error) {
console.error(error)
res.status(500).json({ message: 'Internal server error' })
}
}