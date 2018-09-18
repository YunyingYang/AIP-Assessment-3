const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Chat model
const Chat = require("../../models/Chat");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateChatInput = require("../../validation/chat");

// @route   GET api/chats/test
// @desc    Tests chat route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Chats Works" }));

// @route   GET api/chats
// @desc    Get chats
// @access  Public
router.get("/", (req, res) => {
    Chat.find()
        .sort({ date: 1 })
        .then(chats => res.json(chats))
        .catch(err => res.status(404).json({ nochatsfound: "No chats found" }));
});

// // @route   GET api/chats/:id
// // @desc    Get chat by id
// // @access  Public
// router.get("/:id", (req, res) => {
//   Chat.findById(req.params.id)
//     .then(chat => res.json(chat))
//     .catch(err =>
//       res.status(404).json({ nochatfound: "No chat found with that ID" })
//     );
// });

// @route   POST api/chats
// @desc    Create chat
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateChatInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        const newChat = new Chat({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newChat.save().then(chat => res.json(chat));
    }
);

// // @route   DELETE api/chats/:id
// // @desc    Delete chat
// // @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Chat.findById(req.params.id)
//         .then(chat => {
//           // Check for chat owner
//           if (chat.user.toString() !== req.user.id) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           }

//           // Delete
//           chat.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err => res.status(404).json({ chatnotfound: "No chat found" }));
//     });
//   }
// );

module.exports = router;
