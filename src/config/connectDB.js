import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
dotenv.config();

/**
 * kết nối đến mongodb
 * dùng bluebird để làm việc với Promise
 */
let connectDB = () => {
  mongoose.Promise = bluebird; // dùng promise làm việc với async khi connect
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return mongoose.connect(URI, { useMongoClient: true });
};

module.exports = connectDB;