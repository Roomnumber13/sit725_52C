const { insertDocument, getDocuments } = require('../models/documentModel');

exports.insertDocument = async (req, res) => {
    try {
        const document = req.body;
        const result = await insertDocument(document);
        res.status(201).json({ message: 'Document inserted', id: result.insertedId });
    } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ error: 'Failed to insert document' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await getDocuments();
        res.status(200).json(documents);
    } catch (err) {
        console.error('Error retrieving documents:', err);
        res.status(500).json({ error: 'Failed to retrieve documents' });
    }
};
