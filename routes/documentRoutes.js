const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/insert', documentController.insertDocument);
router.get('/documents', documentController.getDocuments);

module.exports = router;
