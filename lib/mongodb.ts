import { MongoClient, MongoClientOptions } from 'mongodb';

// const uri = process.env.DATABASE_URL;
const uri =
  'mongodb+srv://jmc0013:juampemartin01@cluster0.gza9r.mongodb.net/?retryWrites=true&w=majority';
const options: MongoClientOptions = {};

let client;
let clientPromise;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;
