import mongoose, { Schema } from "mongoose";

const productCategorySchema = mongoose.Schema({
    categoryType: String,
    categoryTitle: String,
    isCategoryAvailable: String,
    catUpdateTime: Number,
    itemImgUrl: String
}, {
    timestamps: true
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;