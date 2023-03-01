import mongoose from 'mongoose'

const productItemSchema = mongoose.Schema({
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

const ProductItem = mongoose.model('ProductItem', productItemSchema)

export default ProductItem;