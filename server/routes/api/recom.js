const express = require("express");
const router = express.Router();
const Itemcb = require("../../models/Itemcb");
const Movie = require("../../models/Movie");

const ContentBasedRecommender = require("content-based-recommender");
const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocuments: 20
});

// // @route   GET api/recom/itemcb
// // @desc    Generate itemcb
// // @access  Public
//------ Generate ITEM CB INFO AND SAVE TO DB-------
router.get("/itemcb", (req, res) => {
  Movie.find()
    .then(movies => {
      res.json(movies);
      const documents = [];
      movies.map(movie => {
        // prepare documents data
        documents.push({ id: movie.movieId.toString(), content: movie.genres });
      });
      // start training
      recommender.train(documents);
      movies.map(movie => {
        //get top 10 similar items to the movie Id
        const similarDocuments = recommender.getSimilarDocuments(
          movie.movieId.toString(),
          0,
          10
        );
        // Get fields
        const itemcbFields = {};
        itemcbFields.movieId = movie.movieId;
        itemcbFields.movie1 = parseInt(similarDocuments[0].id, 10);
        itemcbFields.movie2 = parseInt(similarDocuments[1].id, 10);
        itemcbFields.movie3 = parseInt(similarDocuments[2].id, 10);
        itemcbFields.movie4 = parseInt(similarDocuments[3].id, 10);
        itemcbFields.movie5 = parseInt(similarDocuments[4].id, 10);
        itemcbFields.movie6 = parseInt(similarDocuments[5].id, 10);
        itemcbFields.movie7 = parseInt(similarDocuments[6].id, 10);
        itemcbFields.movie8 = parseInt(similarDocuments[7].id, 10);
        itemcbFields.movie9 = parseInt(similarDocuments[8].id, 10);
        itemcbFields.movie10 = parseInt(similarDocuments[9].id, 10);

        Itemcb.findOne({ movieId: movie.movieId }).then(movie => {
          if (movie) {
            // Update
            Itemcb.findOneAndUpdate(
              { movieId: movie.movieId },
              { $set: itemcbFields },
              { new: true }
            ).then(movie => console.log(movie));
          } else {
            // Create and save itemCB
            new Itemcb(itemcbFields).save().then(movie => console.log(movie));
          }
        });
      });
    })
    .catch(err =>
      res.status(404).json({ noItemcbFound: "There are no itemCB info in DB" })
    );
});

// // @route   POST api/recom/itemcb
// // @desc    Post itemcb
// // @access  Public
//----- Get ITEM CB INFO -------
router.post("/itemcb", (req, res) => {
  const movieId = req.body.movieId;
  Itemcb.findOne({ movieId: movieId })
    .then(itemcb => res.json(itemcb))
    .catch(err =>
      res
        .status(404)
        .json({ noItemcbFound: "This item has no itemCB info in DB" })
    );
});

module.exports = router;
