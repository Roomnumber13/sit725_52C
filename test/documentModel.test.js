const chai = require('chai');
const { expect } = chai;

//Mocking the MongoDB client
const documentModel = require('../models/documentModel');

describe('Document Model', () => {
    describe('insertDocument', () => {
        it('should insert a document into the collection', async () => {
            const document = { title: 'Test Document' };
            const result = await documentModel.insertDocument(document);

            expect(result).to.have.property('insertedId');
        });
    });

    describe('getDocuments', () => {
        it('should retrieve documents from the collection', async () => {
            const documents = await documentModel.getDocuments();

            expect(documents).to.be.an('array');
            expect(documents.length).to.be.greaterThan(0);
        });
    });
});
