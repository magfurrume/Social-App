const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register 
router.post("/register", async (req, res) => {

    try {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create New User
        const newUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        // Save user to DB and response status/ data

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword && res.status(404).json("Please provide a valid email address and password");
            validPassword && res.status(200).json("Login Success");
        } else
            res.json("Please provide a valid email address and password");

    } catch (err) {
        res.status(err).json(err);
    }

})

module.exports = router;
