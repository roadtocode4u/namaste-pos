import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import User from './models/User.js'
dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB 📦');
  });
} catch (err) {
  console.log(`❌ Error:  ${err?.message}`);
}


app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running'
  })
})

app.post('/signup',async(req,res )=>{
  const { fullName, phone, email, password } = req.body;

  const emptyFields = [];

  if (emptyFields.length > 0) {
    return res.json({
      success: false,
      message: `${emptyFields.join(", ")} are required`,
    });
  }

    const user = new User({
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
    });
  
    const savedUser = await user.save();
  
    res.send({
      success: true,
      message: "Signup successfully...",
      data: savedUser,
    });
});


app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
