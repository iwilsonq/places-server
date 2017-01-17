const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

const Places = require('./places.js');

app.get('/places', (req, res) => {
  Places.find({}).exec((err, places) => {
    if (err) return err;
    res.send(places);
  });
});

app.post('/places', (req, res) => {
  const { place, bgImage, fgImage, description, todos } = req.body;
  const newPlace = new Places({
    place, bgImage, fgImage, description, todos
  });
  if (!newPlace) return;
  newPlace.save(err => {
    throw new Error(err);
  });
  res.send('Place saved!');
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
});
