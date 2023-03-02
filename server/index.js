import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ProductItem from './models/ProductItem.js';
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

/* Product Item APIs Starts Here */

// create product item
app.post('/productItem', async (req, res) => {
  const { title, price, description, imgUrl } = req.body;
  // validations will go here
  const productItem = new ProductItem({
    title,
    price,
    description,
    imgUrl
  });

  const savedProductItem = await productItem.save();

  res.json({
    success: true,
    message: 'Product Item created successfully',
    data: savedProductItem,
  });
});

// GET productItem/:id => get productItem by id

app.get('/productItem/:id', async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.findById(id);

  res.json({
    success: true,
    message: 'Product item fetched successfully',
    data: productItem,
  });
});

// GET productItem?title= => get productItem by title
app.get('/productItem', async (req, res) => {
  const { title } = req.query;
  const productItem = await ProductItem.findOne({ title });

  res.json({
    success: true,
    message: 'ProductItem fetched successfully',
    data: productItem,
  });
});

// GET productItems => get all productItems
app.get('/productItems', async (req, res) => {
  const productItems = await ProductItem.find();

  res.json({
    success: true,
    message: 'ProductItems fetched successfully',
    data: productItems,
  });
});

/* Product Item APIs Ends Here */

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
