import express from 'express';
import User from './models/User.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running'
  })
})

app.post("/login", async(req, res) =>{
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if(user) {
    res.send({
    success: true,
    message: "User logged in successfully",
    user: user
    })
  }
  else{
    res.send({
      success: false,
      message: "user name or password is incorrect"
    })
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
