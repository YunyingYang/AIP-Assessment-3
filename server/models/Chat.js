const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Chat = mongoose.model("chat", ChatSchema);