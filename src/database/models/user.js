import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }
  },
  { timestamps: true }
);


export const User = mongoose.model('User', userSchema);
