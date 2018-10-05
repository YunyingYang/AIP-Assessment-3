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
///api/movie/search
//写一个find movie的router
router.post("/search/:search_content", (req, res) => {
  // const searchContent = req.body.searchContent.trim();
  let searchContent = req.params.search_content.trim();
  // console.log("This is searchContent: " + searchContent);
  Movie.find({
    title: { $regex: ".*" + searchContent + ".*", $options: "i" }
  })
    .then(movie => {
      // check movie exist
      if (!movie) {
        errors.movieSearch = "movie not found";
        return res.status(404).json(errors);
      }
      // console.log("This is movies from db: " + res.json);
      res.json(movie);
    })
    .catch(err => res.status(404).json({ nomoviesfound: "No movie searched" }));
});

//接UI的 搜索router⬇️ (((能搜出了整个名字，等下让他搜部分也可以【已完成✅】)))
///api/movie/search
//写一个find movie的router
// router.post("/search", (req, res) => {
//   const searchContent = req.body.searchContent.trim();

//   // Find movie by searchContent
//   // Movie.findOne({ movie_title: searchContent })
//   Movie.find({
//     title: { $regex: ".*" + searchContent + ".*", $options: "i" }
//   })
//     .then(movie => {
//       // check movie exist
//       if (!movie) {
//         errors.movieSearch = "movie not found";
//         return res.status(404).json(errors);
//       }
//       res.json(movie);
//     })
//     .catch(err => res.status(404).json({ nomoviesfound: "No movie searched" }));
// });

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

// test homepage movie cards link to detail page feature
// @route   GET api/movies/trending
// @desc    Get a specific movie
// @access  Public
// router.post('/trending', (req, res) => {
//
//     const tID = req.body.id;
//     const title = req.body.title;
//     let doesExist = true;
//
//     // find a movie in the movies collection where the tmdbId field contains tID
//     // only return _id and genres
//     Movie.findOne(
//         { tmdbId: tID },
//         { _id: 1, genres: 1 }
//     )
//         .then(movie => {
//             if (movie) { // find movie in db
//                 console.log("movie found!");
//                 return res.json(movie);
//             } else {  // movie not exist in db
//                 const newMovie = new Movie({
//                     "title": title,
//                     "genres": "test_Genres",
//                     "tmdbId": tID
//                 });
//                 newMovie
//                     .save()
//                     .then(movie => res.json(movie))
//                     .catch(err => console.log("cannot add new movie into db"))
//             }
//         })
//         .catch(err => {
//             doesExist = false;
//             console.log("cannot find movie, or cannot add to db");
//         });
// });

// @route   GET api/movies
// @desc    Get movies
// @access  Public
// test - randomly get 13 movies from db
router.get("/today", (req, res) => {
  Movie.aggregate([{ $sample: { size: 13 } }])
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ home: "No movies found" }));
});

//    "title": "Toy Story (1995)",
//db.products.find( { description: { $regex: /S/ } } )

router.get("/home", (req, res) => {
  Movie.find({ title: { $regex: /(2016)/ } }, { _id: 1, genres: 1, tmdbId: 1 })
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ home: "No movies found" }));
});

module.exports = router;

//
// {
//     "_id": {
//     "$oid": "5bafbdd2ebb8030b5cc4e02d"
// },
//     "movieId": 1,
//     "title": "Toy Story (1995)",
//     "genres": "Adventure|Animation|Children|Comedy|Fantasy",
//     "imdbId": 114709,
//     "tmdbId": 862
// }
