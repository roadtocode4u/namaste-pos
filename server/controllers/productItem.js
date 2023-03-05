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