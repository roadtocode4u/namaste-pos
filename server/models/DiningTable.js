import mongoose, { Schema } from "mongoose";

const diningTableSchema = new mongoose.Schema({
    tableNumber: Number,
    capacity:Number,
    numberoftable:Number,
    occupied: Boolean,
    occupiedBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    } ,
    tablelocation:String,
    tableservice:String
},{
    timestamps: true
});

const DiningTable = mongoose.model("DiningTable", diningTableSchema);

export default DiningTable;