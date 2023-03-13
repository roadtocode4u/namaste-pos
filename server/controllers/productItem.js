import ProductItem from './../models/ProductItem.js';
import responder from './../util/responder.js';
import ProductCategory from './../models/ProductCategory.js';

export const postProductItem = async (req, res) => {
  const { title, price, description, imgUrl, categoryTitle } = req.body;

  const productCategory = await ProductCategory.findOne({ categoryTitle });
  if (!productCategory) {
    return res.json({
      status: false,
      data: {},
      message: 'product Category not found',
    });
  }
  // validations will go here
  const productItem = new ProductItem({
    title,
    price,
    description,
    imgUrl,
    productCategory,
  });

  const savedProductItem = await productItem.save();
  responder(res, savedProductItem, 'Product Item created successfully');
};

// GET productItem/:id => get productItem by id
export const getProductItemById = async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.findById(id);
  responder(res, productItem, 'Product item fetched successfully');
};

export const getProductItemTitle = async (req, res) => {
  const { categoryTitle } = req.query;
  const productCategory = await ProductCategory.findOne({
    categoryTitle: { $regex: categoryTitle, $options: 'i' },
  });

  if (!categoryTitle) {
    responder(res, null, 'Product Caterogory not Found', false);
  }

  const productItems = await ProductItem.find({
    productCategory: productCategory?._id,
  });

  responder(res, productItems, 'productCategory fetched successfully');
};

// GET productItems => get all productItems
export const getProductItems = async (req, res) => {
  const productItems = await ProductItem.find();
  responder(res, productItems, 'ProductItems fetched successfully');
};

// PUT ProductItem/:id => update productItem by id
export const putProductItem = async (req, res) => {
  const { id } = req.params;
  const { title, price, imgUrl, description } = req.body;

  await ProductItem.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title,
        price,
        imgUrl,
        description,
      },
    }
  );

  const updatedProductItem = await ProductItem.findById(id);
  responder(res, updatedProductItem, 'ProductItem updated successfully');
};

// DELETE productItem/:id => delete productItem by id
export const deleteProductItem = async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.deleteOne({
    _id: id,
  });
  responder(res, productItem, 'ProductItem deleted successfully');
};
