const express = require('express');
const app = express();

app.use(require('body-parser').json());
app.use(require('compression')());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/layout/index.html');
})

app.get('/showcase', (req, res) => {
    res.sendFile(__dirname + '/layout/showcase.html');
});

const rum = [];

app.get('/rum', (req, res) => {
    res.json(rum);
});

app.post('/rum', (req, res) => {
    const device = req.get('User-Agent').indexOf('Android') !== -1 ? 'mobile' : 'desktop';
    const times = req.body

    rum.push({
        device: device,
        loadTime: parseInt(times.loadTime, 10)
    });

    res.json({ result: 'ok' });
});

const oneMonth = 1000 * 60 * 60 * 24 * 30;
const cacheOptions = { maxAge: oneMonth };

app.use(express.static('static', cacheOptions));

app.use('/vendor', express.static('node_modules', cacheOptions));

app.listen(process.env.NODE_PORT || '8080');
