import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please enter your Name'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter your Phone'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your Email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your Password'],
      minlength: [6, 'Password must include more than 6 characters'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
