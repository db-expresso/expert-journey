"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Environment Variable
const env = require("dotenv");
env.config();

const bodyParser = require("body-parser");

//Routes
const loginRoute = require("./src/routes/login");

//Database Connection
mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.9qsnv.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
    console.log('DB connected');
});

app.use(bodyParser());
app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to Server",
  });
});

app.listen(process.env.PORT);
