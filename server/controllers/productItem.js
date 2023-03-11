import ProductItem from './../models/ProductItem.js';
import responder from '../util/responder.js';



export const postProductItem = async (req, res) => {
  const { title, price, description, imgUrl } = req.body;
  // validations will go here
  const productItem = new ProductItem({
    title,
    price,
    description,
    imgUrl,
  });

  const savedProductItem = await productItem.save();
  responder(res, savedProductItem, 'Product Item created successfully')
};


// GET productItem/:id => get productItem by id
export const getProductItemById = async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.findById(id);
  responder(res, productItem, 'Product item fetched successfully')
};

// GET productItem?title= => get productItem by title
export const getProductItemTitle = async (req, res) => {
  const { title } = req.query;
  const productItem = await ProductItem.findOne({ title });
  responder(res, productItem, 'Product item fetched successfully')
};

// GET productItems => get all productItems
export const getProductItems = async (req, res) => {
  const productItems = await ProductItem.find();
  responder(res, productItems, 'ProductItems fetched successfully')
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
  responder(res, updatedProductItem, 'ProductItem updated successfully')
};

// DELETE productItem/:id => delete productItem by id
export const deleteProductItem = async (req, res) => {
  const { id } = req.params;
  const productItem = await ProductItem.deleteOne({
    _id: id,
  });
  responder(res, productItem, 'ProductItem deleted successfully')
};
