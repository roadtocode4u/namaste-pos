import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: [true, "invoiceNumber cannot be empty"]
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    invoiceTotal: {
        type: Number,
        required: [true, "invoiceTotal cannot be empty"]
    },
    discount: {
        type: Number,
        required: [true, "discount cannot be empty"]
    },
    tax: {
        type: Number,
        requied: [true, "tax cannot be empty"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }
},
    {
        timestamps: true
    });

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice;