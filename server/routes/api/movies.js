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


//接UI的 搜索router⬇️ //**让搜索内容加入url, 完成_🐹 **//
///api/movies/search
//写一个find movie的router
router.post("/search/:search_content/:page", function(req, res) {

    let searchContent = req.params.search_content.trim();
    let searchContent1 = searchContent.replace(/\(/gi, "\\(");
    let searchContent2 = searchContent1.replace(/\)/gi, "\\)");

    let itemsPerPage = 10;
    let currentPage = req.params.page || 1;
    let numOfResults;

    // for test
    console.log("movie - -server--routes--test");
    console.log(req.params.page);


    Movie
        .find({title: {$regex: ".*" + searchContent2 + ".*", $options: "i"}})  // find all movies match keyword
        .then(function (movies) {
            if (!movies) {  // if no result then return
                errors.movieSearch = "movie not found";
                return res.status(404).json(errors);
            } else {  // if has result

                numOfResults = Object.keys(movies).length;  // get number of all results

                console.log("server -- api -- test --- count value");
                console.log(numOfResults);

                Movie
                    .find({title: {$regex: ".*" + searchContent2 + ".*", $options: "i"}})  // find all movies match keyword
                    .skip((itemsPerPage * currentPage) - itemsPerPage)
                    .limit(itemsPerPage) // only return items for current page
                    .then(function (movies) {
                        res.json({
                            movies: movies,
                            currentPage: currentPage,
                            totalPages: Math.ceil(numOfResults / itemsPerPage)
                        });
                    })
            }
        })
        .catch(err => res.status(404).json({nomoviesfound: "No movie searched"}))
});



//       .skip((itemsPerPage * currentPage) - itemsPerPage)
//       .limit(itemsPerPage)
//       .then(function(movies) {
//           res.json({
//               movies: movies,
//               currentPage: currentPage,
//               totalPages: Math.ceil(count / itemsPerPage)
//           });
//
//           console.log("server-api- test-totalpage");
//           console.log(totalPages);
//       })
//
// });

// if (!movies) {
//     errors.movieSearch = "movie not found";
//     return res.status(404).json(errors);
// } else {
//     allSearchResults = Object.keys(movies).length;
//
//     console.log("server -- api -- test --- count value");
//     console.log(allSearchResults);
// }











//Search suggest router
//api/movies/suggest
//Public
router.post("/suggest", (req, res) => {
  const searchContent = req.body.searchContent.trim();
  Movie.find({
    title: { $regex: searchContent + ".*", $options: "i" }
  })
    .sort({ _id: -1 })
    .limit(10)
    .then(movie => {
      // check movie exist
      if (!movie) {
        errors.movieSuggest = "movie not found";
        return res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err => res.status(404).json({ nomoviesfound: "No movie found" }));
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
  Movie.aggregate([{ $sample: { size: 13 } }])
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ home: "No movies found" }));
});


router.get("/home", (req, res) => {
  Movie.find({ title: { $regex: /(2016)/ } }, { _id: 1, genres: 1, tmdbId: 1 })
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ home: "No movies found" }));
});

module.exports = router;
