const router = require("express").Router();
const Post = require("../models/Post");



//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        //    res.status(200).json("New Post Created");
        res.status(200).json(savePost)

    } catch (err) {
        res.status(500).json(err)
    }
})
//update a post
router.put("/:id", async (req, res) => {


    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {

            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated")

        } else res.status(403).json("You Can Update Only Your Post");

    } catch (err) {
        res.status(500).json(err)
    }

})
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {

            await post.deleteOne();
            res.status(200).json("Post Deleted")

        } else res.status(403).json("You Can Delete Only Your Post");

    } catch (err) {
        res.status(500).json(err)
    }
})
//like a post
//get a post
//get timeline post

module.exports = router;