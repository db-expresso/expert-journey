
import mongoose from 'mongoose';
const env = process.env.NODE_ENV;
const config = require('./config.js')[env];

export const connect = async (
  opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
  }
) =>
  mongoose
    .connect(config.dburl, {
    //   useCreateIndex: true,
    //   useNewUrlParser: true,
      ...opts,
    })
    .then(() => console.log('database Connected'))
    .catch(err => console.log(`Failed to connect to db${err} ${err.reason}`));