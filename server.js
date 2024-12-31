const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/client.html');
});

//Handling socket.io connections
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//Emiting random numbers to all connected clients
setInterval(() => {
    const x = parseInt(Math.random() * 10);
    io.emit('number', x);
    console.log('Emitting Number ' + x);
}, 1000);

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
