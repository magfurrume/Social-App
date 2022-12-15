const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Import All routes

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();


// MongoDb Connection

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected To MongoDB");
    });

//MiddleWare 

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.get("/", (req, res) => {
    res.send("Welcome to Application")
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(8800, () => { 
    console.log('runningddd')
})