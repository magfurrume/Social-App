const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");



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
        console.log(req.body.userId);
        if (post.userId === req.body.userId) {

            await post.deleteOne();
            res.status(200).json("Post Deleted")

        } else res.status(403).json("You Can Delete Only Your Post");

    } catch (err) {
        res.status(500).json(err)
    }
})
// Like Dislik a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("You Liked This Post");

        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("You Disliked This Post");
        }

    } catch (err) {
        res.status(500).json(err)
    }
})
//get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json('err')
    }
})
//get timeline post

router.get("/timeline/:userId", async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId);

        const userPosts = await Post.find({ userId: currentUser._id }).sort({createdAt:-1});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).sort({createdAt:-1});
            })
        );

        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json('err')
    }
})


//get User's All posts

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.params.username });
        const posts = await Post.find({ userId: user._id }).sort({createdAt:-1});

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json('err')
    }
})

module.exports = router;