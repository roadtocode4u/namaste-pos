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


  // // PUT ProductItem/:id => update productItem by id
  export const putProductItems = async (req, res) => {
    const productItems = await ProductItem.find();
  
    res.json({
      success: true,
      message: 'ProductItems fetched successfully',
      data: productItems,
    });
  }

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
  
  
  