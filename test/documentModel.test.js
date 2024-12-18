const chai = require('chai');
const { expect } = chai;

const documentModel = require('../models/documentModel');

describe('Document Model', () => {
    describe('insertDocument', () => {
        it('should insert a document into the collection', async () => {
            const document = { title: 'Test Document' };
            const result = await documentModel.insertDocument(document);
            expect(result).to.have.property('insertedId');
        });
        it('should handle duplicate document insertion', async () => {
            const document = { title: 'Duplicate Document' };
            await documentModel.insertDocument(document);
            try {
                await documentModel.insertDocument(document);
            } catch (error) {
                expect(error).to.exist;
            }
        });
    });
    describe('getDocuments', () => {
        it('should retrieve documents from the collection', async () => {
            const documents = await documentModel.getDocuments();
            expect(documents).to.be.an('array');
            expect(documents.length).to.be.greaterThan(0);
        });
        it('should return an empty array when no documents exist', async () => {
            await documentModel.clearCollection();
            const documents = await documentModel.getDocuments();
            expect(documents).to.be.an('array').that.is.empty;
        });
    });
});
