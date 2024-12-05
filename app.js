const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

//Parsing JSON bodies
app.use(express.json());

//MongoDB connection URI and database/collection names
const mongoURI = 'mongodb://localhost:27017/';
const dbName = 'myDB';
const collectionName = 'newCollection';

//Create a new MongoClient
const client = new MongoClient(mongoURI);

//Connect to MongoDB and ensure database and collection exist
async function initializeDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
//Condition to check whether the collection is created or not.        
        const exists = await db.listCollections({ name: collectionName }).hasNext();
        if (!exists) {
            await db.createCollection(collectionName);
            console.log(`Collection '${collectionName}' created`);
        } else {
            console.log(`Collection '${collectionName}' already exists`);
        }

        return collection;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

let collection;

//Initialize the database and collection
initializeDatabase().then((col) => {
    collection = col;
});

//API to insert data into the collection
app.post('/insert', async (req, res) => {
    try {
        const document = req.body;
        const result = await collection.insertOne(document);
        res.status(201).json({ message: 'Document inserted', id: result.insertedId });
    } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ error: 'Failed to insert document' });
    }
});

//API to retrieve all documents from the collection
app.get('/documents', async (req, res) => {
    try {
        const documents = await collection.find({}).toArray();
        res.status(200).json(documents);
    } catch (err) {
        console.error('Error retrieving documents:', err);
        res.status(500).json({ error: 'Failed to retrieve documents' });
    }
});

//Start the Express server
app.listen(port,()=>{
    console.log("App listening to: "+port)
});