import mongoose from 'mongoose'

const productItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    imgUrl: {
        type: String,
        required: true
    },

    description: String,

}, {
    timestamps: true
});

const ProductItem = mongoose.model('ProductItem', productItemSchema)

export default ProductItem;