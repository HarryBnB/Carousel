/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser');
// const Carousels = require('../database/Carousel.js');
const cors = require('cors');
const controller = require('./controllers.js');

const app = express();
const port = 3007;

// app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('client/dist'));

app.get('/carousel/carousels', (req, res) => {
  controller.getCarousels(req, res);
});

app.get('/carousel/:roomId/carousels', (req, res) => {
  controller.getSpecificCarousel(req, res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
