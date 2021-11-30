import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    created_by : {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { timestamps: true }
);

export const Item = mongoose.model('Item', itemSchema);
