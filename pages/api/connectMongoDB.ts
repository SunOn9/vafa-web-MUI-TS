import { MongoClient, Db , ConnectOptions} from 'mongodb'

export default async function connectToDatabase () {
    const uri = "mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority";

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions

    let client : MongoClient = new MongoClient(uri, options)
    await client.connect()
    const db: Db = client.db('vafa-web');
    client.close()
    
    return db
}












