const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    message: {
        type: String,
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("Message", MessageSchema)