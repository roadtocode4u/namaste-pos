import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'orderId cannot be empty'],
  },

  tableNumber: {
    type: Number,
    required: [true, 'tableNumber cannot be empty'],
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  items: [
    {
      name: {
        type: String,
        required: [true, 'item name cannot be empty'],
      },
      price: {
        type: Number,
        required: [true, 'item price cannot be empty'],
      },
      quantity: {
        type: Number,
        required: [true, 'item quantity cannot be empty'],
      },
      modifier: String,
    },
  ],

  orderType: {
    type: String,
    enum: ['dine-in', 'take-out', 'delivery'],
    required: [true, 'orderType cannot be empty'],
  },

  orderComments: String,

  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
    required: [true, 'status cannot be empty'],
  },

  feedback: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
