import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'please enter your name'],
    },
    phone: {
      type: String,
      required: [true, 'please enter your phone'],
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
      minlength: [6, 'password must include more than 6 characters'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
