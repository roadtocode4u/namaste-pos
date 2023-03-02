import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ProductItem from './models/ProductItem.js';
import Order from './models/Order.js';
import DiningTable from './models/DiningTable.js';
import Invoice from './models/Invoice.js';
dotenv.config();
mongoose.set('strictQuery', false);

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

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
  });
});

app.post('/signup', async (req, res) => {
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
});

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

/* Product Item APIs Starts Here */

// create product item
app.post('/productItem', async (req, res) => {
  const { title, price, description, imgUrl } = req.body;
  // validations will go here
  const productItem = new ProductItem({
    title,
    price,
    description,
    imgUrl,
  });

  const savedProductItem = await productItem.save();

  res.json({
    success: true,
    message: 'Product Item created successfully',
    data: savedProductItem,
  });
});

// GET productItem/:id => get productItem by id

app.get('/productItem/:id', async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.findById(id);

  res.json({
    success: true,
    message: 'Product item fetched successfully',
    data: productItem,
  });
});

// GET productItem?title= => get productItem by title
app.get('/productItem', async (req, res) => {
  const { title } = req.query;
  const productItem = await ProductItem.findOne({ title });

  res.json({
    success: true,
    message: 'ProductItem fetched successfully',
    data: productItem,
  });
});
 
// GET productItems => get all productItems
app.get('/productItems', async (req, res) => {
  const productItems = await ProductItem.find();

  res.json({
    success: true,
    message: 'ProductItems fetched successfully',
    data: productItems,
  });
});

// PUT ProductItem/:id => update productItem by id
app.put('/productItem/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, imgUrl,description } = req.body;

  await ProductItem.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title,
        price,
        imgUrl,
        description,
      },
    }
  );

  const updatedProductItem = await ProductItem.findById(id);

  res.json({
    success: true,
    message: 'ProductItem updated successfully',
    data: updatedProductItem,
  });
});

// DELETE productItem/:id => delete productItem by id
app.delete('/productItem/:id', async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.deleteOne({
    _id: id,
  });

  res.json({
    success: true,
    message: 'ProductItem deleted successfully',
    data: productItem,
  });
});

/* Product Item APIs Ends Here */

/*---------- Order APIs Starts Here ----------*/

/*----- 1-create order API -----*/

app.post('/order', async (req, res) => {
  const { userId, tableNumber, orderType, items, orderComments } = req.body;

  const totalOrders = await Order.countDocuments();
  const orderId = totalOrders + 1;

  // validations to check if all the required fields are filled or not
  const requiredFields = ['tableNumber', 'items', 'orderType'];
  const emptyFields = requiredFields.filter((field) => !req.body[field]);

  if (emptyFields.length > 0) {
    return res.json({
      success: false,
      message: `${emptyFields.join(', ')} cannot be empty`,
    });
  }

  try {
    const order = new Order({
      orderId,
      userId,
      tableNumber,
      orderType,
      items,
      orderComments,
    });

    const savedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order placed successfully',
      data: savedOrder,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

/*----- 2-Get orders API -----*/

// 2.1-Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();

    res.json({
      success: true,
      message: 'Orders fetched successfully',
      results: orders.length,
      data: orders,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// 2.2-GET order/:id => get order by id
app.get('/order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    res.json({
      success: true,
      message: 'Order fetched successfully',
      data: order,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// 2.2-GET order => get order by tableNumber
app.get('/order', async (req, res) => {
  const { tableNumber } = req.query;

  const order = await Order.findOne({ tableNumber });

  res.json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});


/*----- 3-update orders API -----*/
app.put('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { items, orderType, status } = req.body;

  await Order.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        items,
        orderType,
        status
      },
    }
  );

  const updatedOrder = await Order.findById(id);

  res.json({
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});


/*----- 4-delete order API -----*/
app.delete('/order/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.deleteOne({
    _id: id,
  });

  res.json({
    success: true,
    message: 'Order deleted successfully',
    data: order,
  });
});

/*---------- Order APIs Ends Here ----------*/


/* Dining Table APIs Starts Here */

// POST creatediningtable => 
app.post('/createDiningTable', async (req, res) => {
  const { tableNumber, capacity, numberoftable, tablelocation, tableservice } = req.body;
  // validations 
  const diningTable = new DiningTable({
    tableNumber,
    capacity,
    numberoftable,
    tablelocation,
    tableservice
  });

  const savedDiningTable = await diningTable.save();

  res.json({
    success: true,
    message: 'DiningTable created successfully',
    data: savedDiningTable,
  });
});


// GET diningtables => get all diningtables
app.get('/diningTables', async (req, res) => {
  const diningtables = await DiningTable.find();

  res.json({
    success: true,
    message: 'DiningTable fetched successfully...',
    results: diningtables.length,
    data: diningtables,
  });
});


/* Dining Table APIs End Here */

/* Invoice APIs Starts Here */

/*----- invoice create API -----*/

app.post('/invoice', async (req, res) => {
  const { invoiceNumber, invoiceDate, invoiceTotal, discount, tax, user, order } = req.body;

  const existingInvoice = await Invoice.findOne({ invoiceNumber: invoiceNumber });

  if (existingInvoice) {
    return res.json({
      success: false,
      message: `${invoiceNumber} invoice number already exists`,
    });
  }

  try {
    const newInvoice = new Invoice({
      invoiceNumber,
      invoiceDate,
      invoiceTotal,
      discount,
      tax,
      user,
      order
    })

    const savedInvoice = await newInvoice.save();

    res.json({
      status: true,
      message: "Invoice Created Successfully",
      data: savedInvoice
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
})

/*----- get all invoices API -----*/

app.get('/invoice', async (req, res) => {

  try {
    const invoices = await Invoice.find();

    res.json({
      success: true,
      message: 'Invoices fetched Successfullty',
      data: invoices
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
})

/*----- GET invoice?invoiceNumber= => get invoice by invoiceNumber -----*/

app.get('/invoice', async (req, res) => {
  try {
    const { invoiceNumber } = req.query;
    const invoice = await Invoice.findOne({ invoiceNumber });

    res.json({
      success: true,
      message: 'Book fetched successfully',
      data: invoice,
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }

});

// GET invoice/:id => get invoice by id

app.get('/invoice/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const invoices = await Invoice.findById(id);

    res.json({
      success: true,
      message: "Invoice featch successfully",
      data: invoices
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }

});

/* Invoice APIs End Here */

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
