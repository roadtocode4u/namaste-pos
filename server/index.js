import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
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
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'Email and password are required',
    });
  }

  if (user) {
    res.send({
      success: true,
      message: 'User logged in successfully',
      user: user,
    });
  } else {
    res.send({
      success: false,
      message: 'user name or password is incorrect',
    });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
