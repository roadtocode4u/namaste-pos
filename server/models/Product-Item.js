import mongoose from 'mongoose'

const productItemSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    imgUrl: String,
}, {
    timestamps: true
});

const ProductItem = mongoose.model('ProductItem', productItemSchema)

export default ProductItem;