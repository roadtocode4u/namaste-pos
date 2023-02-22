import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running'
  })
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
