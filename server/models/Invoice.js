import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: [true, "invoiceNumber annot be empty"]
    },
    invoiceDate: {
        type: String,
        required: [true, "invoiceDate cannot be empty"]
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
        type: String,
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