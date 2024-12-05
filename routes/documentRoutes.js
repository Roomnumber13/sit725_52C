const express = require('express');
const router = express.Router();
//Function to handle the logic requests 
const documentController = require('../controllers/documentController');
//Handle POST and GET requests
router.post('/insert', documentController.insertDocument);
router.get('/documents', documentController.getDocuments);
// Integrate route with app.js
module.exports = router;
