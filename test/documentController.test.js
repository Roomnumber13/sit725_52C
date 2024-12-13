const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const documentController = require('../controllers/documentController');
const { insertDocument, getDocuments } = require('../models/documentModel');


describe('Document Controller', () => {
    let insertDocumentStub;
    let getDocumentsStub;
  
  
    beforeEach(() => {
      insertDocumentStub = sinon.stub(insertDocument);
      getDocumentsStub = sinon.stub(getDocuments);
    });
  
  
    afterEach(() => {
      sinon.restore();
    });
  
  
    describe('insertDocument', () => {
      it('should insert a document and return success message', async () => {
        const req = { body: { title: 'Test Document' } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };
  
  
        insertDocumentStub.resolves({ insertedId: '12345' });
  
  
        await documentController.insertDocument(req, res);
  
  
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith({ message: 'Document inserted', id: '12345' })).to.be.true;
      });
  
  
      it('should handle errors during document insertion', async () => {
        const req = { body: { title: 'Test Document' } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };
  
  
        insertDocumentStub.rejects(new Error('Insertion error'));
  
  
        await documentController.insertDocument(req, res);
  
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ error: 'Failed to insert document' })).to.be.true;
      });
    });
  
  
    describe('getDocuments', () => {
      it('should retrieve documents and return them', async () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };
  
  
        getDocumentsStub.resolves([{ title: 'Test Document' }]);
  
  
        await documentController.getDocuments({}, res);
  
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([{ title: 'Test Document' }])).to.be.true;
      });
  
  
      it('should handle errors during document retrieval', async () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub()
        };
  
  
        getDocumentsStub.rejects(new Error('Retrieval error'));
  
  
        await documentController.getDocuments({}, res);
  
  
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ error: 'Failed to retrieve documents' })).to.be.true;
      });
    });
  });
  
