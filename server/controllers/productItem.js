import ProductItem from './models/ProductItem.js';

export const productItem = async (req, res) => {
    const { title, price, description, imgUrl } = req.body;
    // validations will go here
    const productItem = new ProductItem({
      title,
      price,
      description,
      imgUrl,
    });
  
    const savedProductItem = await productItem.save();
  
    res.json({
      success: true,
      message: 'Product Item created successfully',
      data: savedProductItem,
    });
  }
  
// GET productItem/:id => get productItem by id
  export const getProductItemById = async (req, res) => {
    const { id } = req.params;
    const productItem = await ProductItem.findById(id);
  
    res.json({
      success: true,
      message: 'Product item fetched successfully',
      data: productItem,
    });
  }

  // GET productItem?title= => get productItem by title
  export const getProductItemTitle = async (req, res) => {
    const { title } = req.query;
    const productItem = await ProductItem.findOne({ title });
  
    res.json({
      success: true,
      message: 'ProductItem fetched successfully',
      data: productItem,
    });
  }

  // GET productItems => get all productItems
  export const getProductItems = async (req, res) => {
    const productItems = await ProductItem.find();
  
    res.json({
      success: true,
      message: 'ProductItems fetched successfully',
      data: productItems,
    });
  }

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
  
    res.json({
      success: true,
      message: 'ProductItem updated successfully',
      data: updatedProductItem,
    });
  }
  