/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const db = require('./index.js');

mongoose.Promise = global.Promise;

const carouselSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  description: String,
  isSuperhost: Boolean,
  cost: Number,
  ratings: Array,
  photos: Array,
});

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
