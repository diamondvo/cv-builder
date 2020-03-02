const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express();

const dataResponse = require('./mockData/data.json');

app.use(express.urlencoded({ limit: '50mb', extended: true }))
  .use(express.json({ limit: '50mb' }))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('/resume', (req, res) => {
    res.send(dataResponse);
  })
  .listen(5000, err => {
    if (err) {
      console.error('Unable to start Express.', err);
    } else {
      console.log(`Now listening on: http://localhost:5000`);
      console.log('Application started. Press Ctrl+C to shut down.');
    }
  });