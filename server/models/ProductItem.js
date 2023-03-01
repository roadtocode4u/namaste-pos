import  { Schema, model } from "mongoose";

const productItemSchema = new Schema({
    title: {
        type: String,
        required:  [true, "title cannot be empty"]
    },

    price: {
        type: Number,
        required: [true, "number cannot be empty"]

    },

    imgUrl: {
        type: String,
        required: [true, "imgUrl cannot be empty"]
    },

    description: String,

}, {
    timestamps: true
});

const ProductItem = model('ProductItem', productItemSchema)

export default ProductItem;