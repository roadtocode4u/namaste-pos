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

  // GET productItem/:id => get productItem by id
  export const getProductItemId =  async (req, res) => {
    const { id } = req.params;
    const productItem = await ProductItem.findById(id);
  
    res.json({
      success: true,
      message: 'Product item fetched successfully',
      data: productItem,
    });
  }
  
  