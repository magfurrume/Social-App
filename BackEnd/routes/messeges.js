const router = require("express").Router();
const Message = require("../models/Message");

// Create Message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch (err) {
        res.status(500).json('err')
    }
});

// get messages
router.get("/:conversationsId", async (req, res) => {

    try {
        const messages = await Message.find({
            conversationsId: req.params.conversationsId,
        })
        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json('err')
    }
})

module.exports = router;