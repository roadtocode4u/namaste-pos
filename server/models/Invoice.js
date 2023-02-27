import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: Number,
    invoiceDate: String,
    invoiceTotal: Number,
    discount: Number,
    tax: String
},
    {
        timestamps: true
    });

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice;