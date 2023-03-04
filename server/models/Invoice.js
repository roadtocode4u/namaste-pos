import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: Number,
      required: [true, 'invoiceNumber cannot be empty'],
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    invoiceTotal: {
      type: Number,
      required: [true, 'invoiceTotal cannot be empty'],
    },
    discount: {
      type: Number,
      required: [true, 'discount cannot be empty'],
    },
    tax: {
      type: Number,
      required: [true, 'tax cannot be empty'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = model('Invoice', invoiceSchema);

export default Invoice;
