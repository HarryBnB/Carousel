const Carousels = require('../database/Carousel.js');

const getCarousels = (callback) => {
  const max = 79;
  const min = 0;
  const skipsize = Math.floor(Math.random() * (max - min + 1)) + min;
  Carousels.find(callback).sort({ _id: -1 }).skip(skipsize).limit(20);
};

const getSpecificCarousel = (roomId, callback) => {
  Carousels.find({ _id: roomId }, callback).sort({ _id: -1 });
};

module.exports = {
  getCarousels,
  getSpecificCarousel,
};
