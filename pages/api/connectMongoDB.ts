import { MongoClient, MongoClientEvents, TypedEventEmitter, Db, ConnectOptions} from 'mongodb'

const uri = "mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority";

let mongoClient: TypedEventEmitter<MongoClientEvents>

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions
export default async function connectToDatabase(){
    try {
        if (mongoClient) {
            return {mongoClient}
        }
        mongoClient = await new MongoClient(uri,options).connect()
        return { mongoClient }
    } catch (e) {
        console.error(e)
    }
}