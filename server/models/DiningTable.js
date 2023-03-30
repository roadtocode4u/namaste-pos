import { Schema, model } from 'mongoose';

const diningTableSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: [true, 'tablenumber cannot be empty'],
      unique: true,
    },
    capacity: {
      type: Number,
    },
    occupied: {
      type: Boolean,
    },
    occupiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tableLocation: String,
    tableService: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DiningTable = model('DiningTable', diningTableSchema);

export default DiningTable;
