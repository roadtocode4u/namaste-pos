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
  