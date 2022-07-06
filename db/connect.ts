import { Db, MongoClient, MongoClientOptions } from 'mongodb';

/**
 * We have to cache the DB connection
 * when used in a serverless environment otherwise
 * we may encounter performance loss due to
 * time to connect. Also, depending on your DB,
 * you might night be able to have many concurrent
 * DB connections. Most traditional DBs were not made for a stateless
 * environment like serverless. A serverless DB (HTTP based DB) whould work
 * better.
 */
global.mongo = global.mongo || {};

export const connectToDB = async () => {
  const uri =
    'mongodb+srv://jmc0013:juampemartin01@cluster0.gza9r.mongodb.net/?retryWrites=true&w=majority';
  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
  };

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(uri, options);

    console.log('connecting to DB');
    await global.mongo.client.connect();
    console.log('connected to DB');
  }

  const db: Db = global.mongo.client.db('test');

  return { db, dbClient: global.mongo.client };
};
