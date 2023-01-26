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

            await User.findByIdAndDelete(req.params.id);

            res.json("Your Account Has Been Deleted");

        } catch (err) { res.status(err) }

    } else res.status(403).json("You Can Delete Only Your Account");
})

// get user

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {

        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ userName: username });
        const { password, updatedAt, createdAt, __v, ...other } = user._doc;
        res.status(200).json(other)

    } catch (err) { res.status(500).json(err) }
});

// Get Friends 
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, userName, profilePicture } = friend;
            friendList.push({ _id, userName, profilePicture })
        })
        res.status(200).json(friendList)

    } catch (err) { res.status(500).json(err) }
});

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


// Search an user 
// router.get('/search/:name', async (req, res) => {
//     const query = req.params.name;
//     await User.find({ $userName: { $search: query } }, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(data);
//         }
//     });
// });
router.get('/search', (req, res) => {
    const name = req.query.name;
    User.find({userName: {$regex: name, $options: 'i'}}, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(data);
      }
    });
  });

module.exports = router;

