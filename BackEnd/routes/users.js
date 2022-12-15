const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (err) { res.status(err) }
        }
        try {
            // console.log('hi');
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });

            res.status(200).json("Your Account Has Been Updated");

        } catch (err) { res.status(err) }

    } else res.status(403).json("You Can Update Only Your Account");
})


//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            console.log('hi');
            await User.findByIdAndDelete(req.params.id);

            res.json("Your Account Has Been Deleted");

        } catch (err) { res.status(err) }

    } else res.status(403).json("You Can Delete Only Your Account");
})

// get user

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, createdAt, __v, ...other } = user._doc;
        res.status(200).json(other)

    } catch (err) { res.status(500).json(err) }
})
//follow user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("Following")
            } else res.status(403).json("Your Already Follow this User");

        } catch (err) { res.status(err) }

    } else res.status(403).json("You Can't Follow Yourself");
})
//unfollow user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("Unfollowing")
            } else res.status(403).json("Your dont Follow this User");

        } catch (err) { res.status(err) }

    } else res.status(403).json("You Can't unfollow Yourself");
})



module.exports = router;

