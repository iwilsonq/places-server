const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  place: String,
  bgImage: String,
  fgImage: String,
  description: String,
  todos: [String]
});

const Places = mongoose.model('places', PlaceSchema);

module.exports = Places;
