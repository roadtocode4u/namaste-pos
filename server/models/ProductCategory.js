import { Schema, model } from "mongoose";

const productCategorySchema = new Schema(
    {

        categoryType: {
            type: String,
            required: [true, 'category type cannot be empty']
        },

        categoryTitle: {
            type: String,
            required: [true, 'category title cannot be empty']
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
            required: [true, 'item Image url cannot be empty']
        }
    },
    {
        timestamps: true
    }
);

const ProductCategory = model("ProductCategory", productCategorySchema);

export default ProductCategory;