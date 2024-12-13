const { MongoClient } = require('mongodb');
const chai = require('chai');
const expect = chai.expect;
const { initializeDatabase, insertDocument, getDocuments } = require('../models/documentModel');


describe('Document Model', () => {
  let client;
  let db;


  before(async () => {
    client = new MongoClient('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('testDB');
  });


  after(async () => {
    await client.close();
  });


  it('should initialize the database and create collection if not exists', async () => {
    await initializeDatabase();
    const collections = await db.listCollections({ name: 'newCollection' }).toArray();
    expect(collections.length).to.equal(1);
  });


  it('should insert a document into the collection', async () => {
    const document = { title: 'Test Document' };
    const result = await insertDocument(document);
    expect(result.insertedId).to.exist;
  });


  it('should retrieve documents from the collection', async () => {
    const documents = await getDocuments();
    expect(documents.length).to.be.greaterThan(0);
  });
});
