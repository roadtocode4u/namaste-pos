import bcrypt from 'bcrypt';
import User from './../models/User.js';

export const postSignup = async (req, res) => {
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
};
