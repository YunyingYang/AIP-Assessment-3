const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateUserMovieRatingInput = require("../../validation/usermovierating");
// const validateExperienceInput = require("../../validation/experience");
// const validateEducationInput = require("../../validation/education");

// Load UserMovieRating Model
const UserMovieRating = require("../../models/UserMovieRating");
// Load User Model
const User = require("../../models/User");

// @route   GET api/usermovieratings/test
// @desc    Tests usermovieratings route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "UserMovieRatings Works" }));

// @route   GET api/usermovieratings
// @desc    Get current users usermovieratings
// @access  Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};

        UserMovieRating.find({ user: req.user.id })
            .populate("user", ["name", "avatar"])
            .then(usermovierating => {
                if (!usermovierating) {
                    errors.nousermovierating = "There is no movie rating for this user";
                    return res.status(404).json(errors);
                }
                res.json(usermovierating);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/usermovierating/all
// @desc    Get all usermovieratings
// @access  Public
router.get("/all", (req, res) => {
    const errors = {};

    UserMovieRating.find()
        .populate("user", ["name", "avatar"])
        .then(usermovieratings => {
            if (!usermovieratings) {
                errors.nousermovierating = "There are no ratings yet";
                return res.status(404).json(errors);
            }

            res.json(usermovieratings);
        })
        .catch(err => res.status(404).json({ usermovierating: "There are no usermovieratings" }));
});

// @route   GET api/usermovieratings/:mv_id
// @desc    Get a movie rating of current user from usermovieratings
// @access  Private
router.get(
    "/:mv_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        UserMovieRating.findOne({ user: req.user.id, movie: req.params.mv_id })
            .then(usermovierating => {
                if (!usermovierating) {
                    errors.nousermovierating = "This movie hasn't rated by this user";
                    return res.status(404).json(errors);
                }
                res.json(usermovierating);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/usermovieratings/user/:user_id
// @desc    Get movie ratings of a specific user
// @access  Public

router.get("/user/:user_id", (req, res) => {
    const errors = {};

    UserMovieRating.find({ user: req.params.user_id })
        .populate("user movie", ["name", "avatar", "title", "genres"])
        .then(usermovierating => {
            if (!usermovierating) {
                errors.nousermovierating = "There is no rating by this user";
                res.status(404).json(errors);
            }
            //usermovierating.populate("movie", ["title", "genres"]);
            res.json(usermovierating);
        })
        .catch(err =>
            res.status(404).json({ usermovierating: "Find rating by this user error" })
        );
});

// // @route   GET api/profile/handle/:handle
// // @desc    Get profile by handle
// // @access  Public

// router.get("/handle/:handle", (req, res) => {
//     const errors = {};

//     Profile.findOne({ handle: req.params.handle })
//         .populate("user", ["name", "avatar"])
//         .then(profile => {
//             if (!profile) {
//                 errors.noprofile = "There is no profile for this user";
//                 res.status(404).json(errors);
//             }

//             res.json(profile);
//         })
//         .catch(err => res.status(404).json(err));
// });

// // @route   GET api/profile/user/:user_id
// // @desc    Get profile by user ID
// // @access  Public

// router.get("/user/:user_id", (req, res) => {
//     const errors = {};

//     Profile.findOne({ user: req.params.user_id })
//         .populate("user", ["name", "avatar"])
//         .then(profile => {
//             if (!profile) {
//                 errors.noprofile = "There is no profile for this user";
//                 res.status(404).json(errors);
//             }

//             res.json(profile);
//         })
//         .catch(err =>
//             res.status(404).json({ profile: "There is no profile for this user" })
//         );
// });

// @route   POST api/usermovieratings
// @desc    Create or edit user movie rating
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateUserMovieRatingInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const userMovieRatingFields = {};
        userMovieRatingFields.user = req.user.id;
        userMovieRatingFields.movie = req.body.movieID;
        //if (req.body.movieID) userMovieRatingFields.movie = req.body.movieID;
        if (req.body.rating) userMovieRatingFields.rating = req.body.rating;

        UserMovieRating.findOne({ user: req.user.id, movie: req.body.movieID }).then(usermovierating => {
            //new UserMovieRating(userMovieRatingFields).save().then(usermovierating => res.json(usermovierating));
            //if (UserMovieRating.findOne({ movie: req.body.movieID })) {
            if (usermovierating) {
                // Update
                UserMovieRating.findOneAndUpdate(
                    { user: req.user.id, movie: req.body.movieID },
                    { $set: userMovieRatingFields },
                    { new: true }
                ).then(usermovierating => res.json(usermovierating));
                //}
            } else {

                // Check if handle exists
                // UserMovieRating.findOne({ handle: profileFields.handle }).then(profile => {
                //     if (profile) {
                //         errors.handle = "That handle already exists";
                //         res.status(400).json(errors);
                //     }

                // Create and save UserMovieRating
                new UserMovieRating(userMovieRatingFields).save().then(usermovierating => res.json(usermovierating));
                //});
            }
        });
    }
);

// // @route   POST api/profile/experience
// // @desc    Add experience to profile
// // @access  Private
// router.post(
//   "/experience",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateExperienceInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newExp = {
//         title: req.body.title,
//         company: req.body.company,
//         location: req.body.location,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to exp array
//       profile.experience.unshift(newExp);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// // @route   POST api/profile/education
// // @desc    Add education to profile
// // @access  Private
// router.post(
//   "/education",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateEducationInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newEdu = {
//         school: req.body.school,
//         degree: req.body.degree,
//         fieldofstudy: req.body.fieldofstudy,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to exp array
//       profile.education.unshift(newEdu);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// @route   DELETE api/usermovieratings/:mv_id
// @desc    Delete a movie rating from usermovieratings
// @access  Private
router.delete(
    "/:mv_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        UserMovieRating.findOneAndRemove({ user: req.user.id, movie: req.params.mv_id })
            .then(() => {
                res.json({ success: true })
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   DELETE api/usermovieratings/
// @desc    Delete user and usermovieratings
// @access  Private
router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        UserMovieRating.findAndRemove({ user: req.user.id }).then(() => {
            res.json({ success: true })
        });
    }
);

module.exports = router;
