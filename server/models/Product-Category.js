import mongoose, { Schema } from "mongoose";

const productCategorySchema = mongoose.Schema(
    {

        categoryType: {
            type: String,
            required: true
        },

        categoryTitle: {
            type: String,
            required: true
        },

        isCategoryAvailable: Boolean,

        catUpdateTime: Date,

        itemImgUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;