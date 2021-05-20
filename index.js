"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//Environment Variable
const env = require("dotenv");
env.config();

const bodyParser = require("body-parser");

//Routes
const loginRoute = require("./src/routes/login");
const productRoute = require("./src/routes/product");

//Database Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.9qsnv.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("DB connected");
  });
app.use(cors());
app.use("/api", loginRoute);
app.use("/api", productRoute);

app.listen(process.env.PORT);
