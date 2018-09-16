const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Movie model
const Movie = require("../../models/Movie");

// @route   GET api/movies
// @desc    Get movies
// @access  Public
// For test！！！ 用这个得到目前movies里所有电影（并用时间排序）
router.get("/", (req, res) => {
  Movie.find()
    .sort({ date: -1 })
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ nomoviesfound: "No movies found" }));
});

// @route   GET api/movies/result/:movie_id
// @desc    Get movies
// @access  Public
router.get("/result/:movie_id", (req, res) => {
  const errors = {};
  Movie.findById(req.params.movie_id)
    .then(movie => {
      if (!movie) {
        errors.noMovie = "There is no movie for this movie_id";
        res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err =>
      res.status(404).json({ movieSearch: "There is no movie for this user" })
    );
});

// just for test !!!
// post存一个看看collection叫啥:叫movies
// 这个post测试用，注意title是必输项
router.post("/save", (req, res) => {
  const newMovie = new Movie({
    movie_title: req.body.title,
    title_year: req.body.year
  });

  newMovie
    .save()
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
});

module.exports = router;
