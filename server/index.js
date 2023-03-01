import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Book from './models/Book.js';
dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to DB 📦');
    }
  );
} catch (err) {
  console.log(`❌ Error:  ${err?.message}`);
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
  });
});

app.post('/signup', async (req, res) => {
  const { fullName, phone, email, password } = req.body;

  const emptyFields = [];

  if (!fullName) emptyFields.push('fullName');
  if (!phone) emptyFields.push('phone');
  if (!email) emptyFields.push('email');
  if (!password) emptyFields.push('password');

  if (emptyFields.length > 0) {
    return res.json({
      success: false,
      message: `${emptyFields.join(', ')} is required`,
    });
  }

  // validations to check if email already exist start
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({
      success: false,
      message: 'Email already exists',
    });
  }

  // validations to check if phone already exist start
  const existingUserPhone = await User.findOne({ phone: phone });
  if (existingUserPhone) {
    return res.json({
      success: false,
      message: 'Phone already exists',
    });
  }

  try {
    const user = new User({
      fullName,
      phone,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const savedUser = await user.save();

    res.json({
      success: true,
      message: 'Signup successfully...',
      data: savedUser,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'Email and password are required',
    });
  }

  const user = await User.findOne({ email });
  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    return res.json({
      success: true,
      message: 'User logged in successfully',
      user: user,
    });
  } else {
    return res.json({
      success: false,
      message: 'Username or Password is incorrect',
    });
  }
});

/*
 Sample API Routes Starts Here
*/

// POST book  => create book
app.post('/book', async (req, res) => {
  const { title, author, price } = req.body;
  // validations will go here
  const book = new Book({
    title,
    author,
    price,
  });

  const savedBook = await book.save();

  res.json({
    success: true,
    message: 'Book created successfully',
    data: savedBook,
  });
});

// GET book/:id => get book by id
app.get('/book/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  res.json({
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

// GET book?title= => get book by title
app.get('/book', async (req, res) => {
  const { title } = req.query;
  const book = await Book.findOne({ title });

  res.json({
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

// GET books => get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();

  res.json({
    success: true,
    message: 'Books fetched successfully',
    data: books,
  });
});

// PUT book/:id => update book by id
app.put('/book/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  await Book.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title,
        author,
        price,
      },
    }
  );

  const updatedBook = await Book.findById(id);

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });
});

// DELETE book/:id => delete book by id
app.delete('/book/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.deleteOne({
    _id: id,
  });

  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: book,
  });
});
/*
 Sample API Routes Ends Here
*/

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
