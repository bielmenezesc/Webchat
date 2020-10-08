const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.redirect("/about");
})

app.get("/about", function(req, res) {
    res.render('index.html')
})

app.get("/portfolio", function(req, res) {
    res.render("index.t")
})

let messages = [];

io.on('connection', socket => {

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);

        socket.broadcast.emit('receivedMessage', data);
    });

})

server.listen(port);