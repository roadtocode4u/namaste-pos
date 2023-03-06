import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();
mongoose.set('strictQuery', false);

import { getHealth } from './controllers/health.js';

import { postSignup } from './controllers/auth.js';

import {
  postProductCategory,
  getProductCategoryTitle,
  getProductCategories,
  putProductCategoryId,
  deleteProductCategoryId,
} from './controllers/productCategory.js';

import {
  postProductItem,
  getProductItemById,
  getProductItemTitle,
  getProductItems,
  putProductItem,
  deleteProductItem,
} from './controllers/productItem.js';

import {
  postInvoice,
  getInvoice,
  getInvoiceByInvoiceNumber,
  getInvoiceId,
  putInvoice,
  deleteInvoice,
} from './controllers/invoice.js';
import {
  deleteOrder,
  getOrderId,
  getOrders,
  getOrderTableNumber,
  postOrder,
  putOrder,
} from './controllers/order.js';

import {
  postDiningTable,
  getDiningTableByID,
  getallDiningTables,
  putDiningTable,
  deleteDiningTable,
} from './controllers/diningTable.js';

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

app.get('/health', getHealth);

app.post('/signup', postSignup);

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

app.post('/createDiningTable', postDiningTable);
app.get('/diningTable/:id', getDiningTableByID);
app.get('/diningTables', getallDiningTables);
app.put('/diningTable/:id', putDiningTable);
app.delete('/diningTable/:id', deleteDiningTable);

app.post('/productCategory', postProductCategory);
app.get('/productCategory', getProductCategoryTitle);
app.get('/productCategories', getProductCategories);
app.put('/productCategory/:id', putProductCategoryId);
app.delete('/productCategory/:id', deleteProductCategoryId);

app.post('/productItem', postProductItem);
app.get('/productItem/:id', getProductItemById);
app.get('/productItem', getProductItemTitle);
app.get('/productItems', getProductItems);
app.put('/productItem/:id', putProductItem);
app.delete('/productItem/:id', deleteProductItem);

app.post('/order', postOrder);
app.get('/orders', getOrders);
app.get('/order/:id', getOrderId);
app.get('/order', getOrderTableNumber);
app.put('/order/:id', putOrder);
app.delete('/order/:id', deleteOrder);

app.post('/invoice', postInvoice);
app.get('/invoice', getInvoice);
app.get('/invoice', getInvoiceByInvoiceNumber);
app.get('/invoice/:id', getInvoiceId);
app.put('/invoice/:id', putInvoice);
app.delete('/invoice/:id', deleteInvoice);

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
