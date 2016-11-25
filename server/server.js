import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/data/schools', (req, res) => {
    const tempdata = [
        {
            id: 'MUSIC',
            name: 'Bienen'
        },
        {
            id: 'SoC',
            name: 'Comm'
        },
        {
            id: 'MEAS',
            name: 'McCormick'
        }
    ];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(tempdata));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
