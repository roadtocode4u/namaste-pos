import bcrypt from 'bcrypt';

import User from './../models/User.js';
import responder from './../util/responder.js';

export const postSignup = async (req, res) => {
  const { fullName, phone, email, password } = req.body;

  const emptyFields = [];

  if (!fullName) emptyFields.push('fullName');
  if (!phone) emptyFields.push('phone');
  if (!email) emptyFields.push('email');
  if (!password) emptyFields.push('password');

  if (emptyFields.length > 0) {
    responder(res, null, `${emptyFields.join(', ')} is required`, false);
  }

  // validations to check if email already exist start
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    responder(res, null, 'Email already exists', false);
  }

  // validations to check if phone already exist start
  const existingUserPhone = await User.findOne({ phone });
  if (existingUserPhone) {
    responder(res, null, 'Phone already exists', false);
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
    responder(res, savedUser, 'Signup successfully...');
  } catch (err) {
    responder(res, null, err.message, false);
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    responder(res, null, 'Email and password are required', false);
  }

  const user = await User.findOne({ email });
  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    responder(res, user, 'User logged in successfully');
  } else {
    responder(res, null, 'Username or Password is incorrect', false);
  }
};
