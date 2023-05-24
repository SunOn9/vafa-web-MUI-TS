import { MongoClient, Db , ConnectOptions} from 'mongodb';

let cachedDb: Db | null = null;
const uri = "mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority";
export default async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);

    const db = client.db('vafa-web');

    cachedDb = db;
    return db;
}