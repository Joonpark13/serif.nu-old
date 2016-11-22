const express = require('express');
const request = require('request-json');

const app = express();

app.use(express.static('dist'));

const api = request.createClient('http://www.northwestern.edu/class-descriptions/4650/');

api.get('index-v2.json', (err, res, body) => {
  if (err) {
    console.log(err);
  } else {
    console.log(body);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
