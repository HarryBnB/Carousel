/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser');
// const Carousels = require('../database/Carousel.js');
const path = require('path');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const controller = require('./controllers.js');

const app = express();
const port = process.env.PORT || 3007;
const publicPath = path.join(__dirname, '/../client/dist');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/', expressStaticGzip(publicPath, { enableBrotli: true, orderPreference: ['br'] }));

app.get('/carousel/carousels', (req, res) => {
  controller.getCarousels(req, res);
});

app.get('/carousel/:roomId/carousels', (req, res) => {
  controller.getSpecificCarousel(req, res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
