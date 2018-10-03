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

// @route   GET api/movies/mvdetails/:movie_id
// @desc    Get movies
// @access  Public
router.get("/mvdetails/:movie_id", (req, res) => {
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

//接UI的 搜索router⬇️ (((能搜出了整个名字，等下让他搜部分也可以【已完成✅】)))
///api/movie/search
//写一个find movie的router
router.post("/search", (req, res) => {
  const searchContent = req.body.searchContent;

  // Find movie by searchContent
  // Movie.findOne({ movie_title: searchContent })
  Movie.find({
    title: { $regex: ".*" + searchContent + ".*", $options: "i" }
  })
    .then(movie => {
      // check movie exist
      if (!movie) {
        errors.movieSearch = "movie not found";
        return res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err => res.status(404).json({ nomoviesfound: "No movie searched" }));
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

// @route   GET api/movies
// @desc    Get movies
// @access  Public
// test - randomly get 13 movies from db
router.get("/today", (req, res) => {
    Movie.aggregate([ { $sample: { size: 13 } } ])
        .then(movies => res.json(movies))
        .catch(err => res.status(404).json({ home: "No movies found" }));
});

module.exports = router;
