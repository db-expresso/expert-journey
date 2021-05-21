"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

//Environment Variable
const env = require("dotenv");
env.config();

const { requireSignin } = require("./src/middlewares");

//Routes
const loginRoute = require("./src/routes/login");
const profile = require("./src/routes/login");
const inventoryRoutes = require("./src/routes/inventory");

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

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", loginRoute);
app.use("/api", profile);
app.use("/api", requireSignin, inventoryRoutes);

app.listen(process.env.PORT);
