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

        isCategoryAvailable: {
            type: Boolean,
            default: true
        },

        catUpdateTime: {
            type: Date,
            default: Date.now 
        },

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