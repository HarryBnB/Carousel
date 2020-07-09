/* eslint-disable no-console */
// getting-started.js
const mongoose = require('mongoose');

const mongoUri = 'mongodb://172.17.0.2:27017/carousel';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected'))
  .catch((err) => { console.log(err); });

module.exports = db;
