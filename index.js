const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/layout/index.html');
})

app.get('/showcase', (req, res) => {
    res.sendFile(__dirname + '/layout/showcase.html');
});

app.use(express.static('static'));

app.use('/vendor', express.static('node_modules'));

app.listen(process.env.NODE_PORT || '8080');
