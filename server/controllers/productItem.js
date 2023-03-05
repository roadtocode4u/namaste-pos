import ProductItem from './models/ProductItem.js';

// POST productItem => create productItem
 export const  postProductItem = async (req, res) => {
    const { title, price, description, imgUrl } = req.body;

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
  