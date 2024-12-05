const express = require('express');
const { initializeDatabase } = require('./models/documentModel');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', documentRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});