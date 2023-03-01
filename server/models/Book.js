import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model('book', bookSchema);

export default Book;
