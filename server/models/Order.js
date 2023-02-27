import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },

        tableNumber: {
            type: Number,
            required: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        orderType: {
            type: String,
            enum: ['dine-in', 'take-out', 'delivery'],
            required: true,
        },

        items: [
            {
              name: {
                type: String,
                required: true,
              },
              price: {
                type: Number,
                required: true,
              },
              quantity: {
                type: Number,
                required: true,
              },
              modifier: String
            },
        ],

        orderComments: String,

        status: {
            type: String,
            enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
            default: 'pending',
            required: true,
          },
          
        feedback: String
    }
)

const Order = mongoose.model('Order', orderSchema);

export default Order;