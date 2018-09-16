const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MovieSchema = new Schema({
  movie_title: {
    type: String,
    required: true
  },
  title_year: {
    type: Number,
    default: 0
  },
  director_name: {
    String
  },
  duration: {
    type: Number,
    default: 0
  },
  genres: {
    String
  },
  plot_keywords: {
    String
  },
  movie_imdb_link: {
    String
  },
  imdb_score: {
    type: Number
    // default: 0.0
  },
  language: {
    String
  },
  country: {
    String
  },
  actor_1_name: {
    String
  },
  actor_2_name: {
    String
  },
  actor_3_name: {
    String
  }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
