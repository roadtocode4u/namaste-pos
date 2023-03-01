import  { Schema,model  } from "mongoose";

const diningTableSchema = new Schema({
    tableNumber: {
        type:Number,
        required: [true, 'tablenumber cannot be empty'],
        unique:true
    },
    capacity:{
        type:Number,
        required:[true, 'capacity cannot be empty']
    },
    numberoftable:Number,
    occupied: Boolean,
    occupiedBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    } ,
    tablelocation:String,
    tableservice:{
        type:String,
        required:[true, 'tableservice cannot be empty']
    }
},{
    timestamps: true
});

const DiningTable = model("DiningTable", diningTableSchema);

export default DiningTable;