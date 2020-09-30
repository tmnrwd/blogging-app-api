const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    tags: Array,
    text: String,
    date: Date
})

module.exports.Post = mongoose.model('Post', postSchema)