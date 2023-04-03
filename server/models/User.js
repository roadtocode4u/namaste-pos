import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'please enter your fullname'],
    },
    phone: {
      type: String,
      required: [true, 'please enter your phone'],
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'please enter valid email'],
      set: (value) => validator.normalizeEmail(value),
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
      minlength: [6, 'password must include more than 6 characters'],
    },
    role: {type:String, default: "user"}
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
