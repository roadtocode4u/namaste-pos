import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: String,
        tableNumber: Number,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        orderType: String,
        items: [
            {
              name: String,
              price: Number,
              quantity: Number,
              modifier: String
            },
        ],
        orderComments: String,
        status: String,
        feedback: String
    }
)

const Order = mongoose.model('Order', orderSchema);

export default Order;