import mongoose from 'mongoose';

const productCategorySchema = mongoose.Schema(
  {
    categoryType: {
      type: String,
      required: [true, 'category type cannot be empty'],
    },

    categoryTitle: {
      type: String,
      required: [true, 'category title cannot be empty'],
    },

    isCategoryAvailable: {
      type: Boolean,
      default: true,
    },

    catUpdateTime: {
      type: Date,
      default: Date.now,
    },

    itemImgUrl: {
      type: String,
      required: [true, 'item Image url cannot be empty'],
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);

export default ProductCategory;
