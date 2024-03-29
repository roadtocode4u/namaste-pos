import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();

dotenv.config();
mongoose.set('strictQuery', false);

import { getHealth } from './controllers/health.js';

import { postSignup, postLogin } from './controllers/auth.js';

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
  getProductItemByCateogoryTitle,
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
  getOrdersUserId,
  getOrders,
  getOrderTableNumber,
  postOrder,
  putOrder,
  updateOrderStatus,
} from './controllers/order.js';

import {
  postDiningTable,
  getDiningTableByID,
  getallDiningTables,
  putDiningTable,
  deleteDiningTable,
} from './controllers/diningTable.js';

import {
  bookTablePost,
  postunbookTable,
  getavailableTables,
} from './controllers/bookStatus.js';

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
app.post('/login', postLogin);

app.post('/createDiningTable', postDiningTable);
app.get('/diningTable/:id', getDiningTableByID);
app.get('/diningTables', getallDiningTables);
app.put('/diningTable/:id', putDiningTable);
app.delete('/diningTable/:id', deleteDiningTable);

app.post('/bookTable/:tableNumber', bookTablePost);
app.post('/unbookTable/:tableNumber', postunbookTable);
app.get('/availableTables', getavailableTables);

app.post('/productCategory', postProductCategory);
app.get('/productCategory', getProductCategoryTitle);
app.get('/productCategories', getProductCategories);
app.put('/productCategory/:id', putProductCategoryId);
app.delete('/productCategory/:id', deleteProductCategoryId);

app.post('/productItem', postProductItem);
app.get('/productItem/:id', getProductItemById);
app.get('/productItem', getProductItemByCateogoryTitle);
app.get('/productItemTitle', getProductItemTitle);
app.get('/productItems', getProductItems);
app.put('/productItem/:id', putProductItem);
app.delete('/productItem/:id', deleteProductItem);

app.post('/order', postOrder);
app.get('/orders', getOrders);
app.get('/order/:id', getOrderId);
app.get('/orders/:userId', getOrdersUserId);
app.get('/order', getOrderTableNumber);
app.put('/order/:id', putOrder);
app.put('/orders/update-status', updateOrderStatus);
app.delete('/order/:id', deleteOrder);

app.post('/invoice', postInvoice);
app.get('/invoice', getInvoice);
app.get('/invoice', getInvoiceByInvoiceNumber);
app.get('/invoice/:id', getInvoiceId);
app.put('/invoice/:id', putInvoice);
app.delete('/invoice/:id', deleteInvoice);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
