/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
const process = require('process');

const faker = require('faker');

const db = require('./index.js');

const Carousel = require('./Carousel.js');

/* generating randomized description on each room  */
const descriptions = [ // 6 descriptions
  '2 guests · Studio · 1 bed · 1bath',
  '3 guests · 1 bedroom · 1 bed · 2 shared bath',
  '1 guests · 1 bedroom · 1 bed · 1 shared bath',
  '1 guests · Studio · 1 bed · 1bath',
  '4 guests · Villa · 3 bed · 2bath',
  '2 guests · 1 bedroom · 1 bed · 1 private bath',
];

const getRandomDescription = () => {
  const max = descriptions.length - 1;
  const min = 0;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return descriptions[randomIndex];
};

/* generating randomized cost */
const getRandomCost = () => {
  const max = 300;
  const min = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* generating randomized rating collection */
const getRandomRating = () => {
  const max = 5;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRatings = () => {
  const ratings = [];
  const max = 30;
  const min = 10;
  const numOfClients = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < numOfClients; i++) {
    const randomRating = getRandomRating();
    ratings.push(randomRating);
  }
  return ratings;
};

/* generating randomized photo collection */
const photos = [ // 11 photos
  'https://rooms.s3-us-west-1.amazonaws.com/webP/0ab86de4-fa36-40d3-9d6f-c0a773108720.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/215966d4-c983-48d6-80ff-3cc5e9ed364d.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/226a5d6e-af7c-4780-9138-a41b37a0cadf.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/4c86a247-7f3d-420f-af8d-7127b058e4fd.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/5c42f4dd-e7be-41dd-9f87-a883fc0d873d.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/7b228af7-7d6d-4c72-9adb-c83edc0d4147.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/855bdc11-2683-4d04-9102-f8eb488d7609.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/8fb926fa-082a-428c-9e48-3ec496a6c472.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/9dfaa5cf-1a77-415b-8c54-6844d83c0739.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/e53a5b88-34d0-4007-afec-e80bcdac7027.webp',
  'https://rooms.s3-us-west-1.amazonaws.com/webP/e77bedc1-4e8c-4539-b9f1-1423d4bddd8b.webp',
];

const getRandomPhotoUrl = () => {
  const max = photos.length - 1;
  const min = 0;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return photos[randomIndex];
};

const randomPhotoUrls = () => {
  const urls = [];
  const max = 7;
  const min = 4;
  const numberOfPhotos = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < numberOfPhotos; i++) {
    const randomPhotoUrl = getRandomPhotoUrl();
    urls.push(randomPhotoUrl);
  }
  return urls;
};

/* create fake caroousels to insert into database */
const getCarousels = (num) => {
  const numOfCarousels = num || 1;
  const carousels = [];
  for (let i = 0; i < numOfCarousels; i++) {
    const carousel = {
      _id: i,
      title: faker.lorem.sentence(),
      // description: faker.random.words(),
      description: getRandomDescription(),
      isSuperhost: faker.random.boolean(),
      cost: getRandomCost(),
      ratings: getRatings(),
      photos: randomPhotoUrls(),
    };
    carousels.push(carousel);
  }
  return carousels;
};
// create 100 carousels
const carousels = getCarousels(100);
// show the first one for checking
// console.log(carousels[0]);

const insertSampleCarousels = () => {
  Carousel.create(carousels)
    .then(() => console.log('successful!'))
    .catch((err) => { console.log(err); })
    .finally(() => process.exit());
};

insertSampleCarousels();
