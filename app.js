//Updated the week 3 & 4 code to support MVC architecture
const express = require('express');
//Function to connect with models - database 
const { initializeDatabase } = require('./models/documentModel');
//Function to handle get & post requests in routes
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
//To access the static files
app.use(express.static('public'));
app.use('/api', documentRoutes);

//Handles the view request and respond to client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//Initialize db & start server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
      res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
  })