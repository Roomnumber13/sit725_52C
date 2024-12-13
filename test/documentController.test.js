const chai = require('chai');
const { expect } = chai;

const documentController = require('../controllers/documentController');
const documentModel = require('../models/documentModel');

describe('Document Controller', () => {
    //Initializing the database before running the tests
    before(async () => {
        await documentModel.initializeDatabase();
    });

    describe('insertDocument', () => {
        it('should insert a document and return success message', async () => {
            const req = { body: { title: 'Test Document' } };
            const res = {
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                json: function (data) {
                    this.jsonData = data;
                }
            };
            await documentController.insertDocument(req, res);
            expect(res.statusCode).to.equal(201);
            expect(res.jsonData).to.have.property('message', 'Document inserted');
            //Convert ObjectID to string for comparison
            expect(res.jsonData).to.have.property('id');
            const insertedId = res.jsonData.id.toString();
            expect(insertedId).to.be.a('string');
            console.log('Inserted ID:', res.jsonData.id);
        });
    });

    describe('getDocuments', () => {
        it('should retrieve documents and return them', async () => {
            const req = {};
            const res = {
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                json: function (data) {
                    this.jsonData = data;
                }
            };
            await documentController.getDocuments(req, res);
            expect(res.statusCode).to.equal(200);
            expect(res.jsonData).to.be.an('array');
        });
    });
});
