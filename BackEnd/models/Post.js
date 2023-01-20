const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        max: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],

    },
    privacy: {
        type: Number,
        enum: [1, 2, 3]

    }
},
    { timestamps: true }
)
module.exports = mongoose.model("Post", PostSchema)