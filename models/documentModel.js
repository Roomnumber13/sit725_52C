const { MongoClient } = require('mongodb');
//Connecting to mongodb and create db & collections
const mongoURI = 'mongodb://localhost:27017/';
const dbName = 'myDB';
const collectionName = 'newCollection';

let collection;

async function initializeDatabase() {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    collection = db.collection(collectionName);

    const exists = await db.listCollections({ name: collectionName }).hasNext();
    if (!exists) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created`);
    } else {
        console.log(`Collection '${collectionName}' already exists`);
    }
}

async function insertDocument(document) {
    return await collection.insertOne(document);
}

async function getDocuments() {
    return await collection.find({}).toArray();
}
//Other modules to interact with db
module.exports = { initializeDatabase, insertDocument, getDocuments };
