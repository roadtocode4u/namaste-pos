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
      required: [true, 'capacity cannot be empty'],
    },
    numberOfTable: Number,
    occupied: {
      type: Boolean,
      default: false,
    },
    occupiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tableLocation: String,
    tableService: {
      type: String,
      required: [true, 'tableservice cannot be empty'],
    },
  },
  {
    timestamps: true,
  }
);

const DiningTable = model('DiningTable', diningTableSchema);

export default DiningTable;
