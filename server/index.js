import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', false);

// controllers
import {
  postBook,
  getBookId,
  getBookTitle,
  getBooks,
  putBook,
  deleteBook,
} from './controllers/book.js';

import { postSignup, postLogin } from './controllers/auth.js';

import { getHealth } from './controllers/general.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(
    'mongodb://localhost:27017/namaste-pos',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to DB 📦');
    }
  );
} catch (err) {
  console.log(`❌ Error:  ${err?.message}`);
}

app.get('/health', getHealth);

/*
  Auth API Routes Starts Here
*/
app.post('/signup', postSignup);
app.post('/login', postLogin);
/*
  Auth API Routes Ends Here
*/

/*
 Book API Routes Starts Here
*/
app.post('/book', postBook);
app.get('/book/:id', getBookId);
app.get('/book', getBookTitle);
app.get('/books', getBooks);
app.put('/book/:id', putBook);
app.delete('/book/:id', deleteBook);
/*
  Book API Routes Ends Here
*/

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
