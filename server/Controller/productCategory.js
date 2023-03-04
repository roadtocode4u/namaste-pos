import ProductCategory from './models/ProductCategory.js';

// POST productCategory = create productCategory 

export const postProductCategory = async (req, res) => {
    const { categoryType, categoryTitle, itemImgURL } = req.body;
    
    // validations for productCategory
    const emptyCategory =[]
  
    if(!categoryType) emptyCategory.push('Category Type')
    if(!categoryTitle) emptyCategory.push('Category Title')
    if(!itemImgURL) emptyCategory.push('ImgURL')
  
    if(emptyCategory.length > 0){
      return res.json({
        success: false,
        message:`${emptyCategory.join(' , ')} Required !`
      });
    }
  
    try{
      const productCategory = new ProductCategory({
        categoryType,
        categoryTitle,
        itemImgURL
      });
    
      const savedProductCategory = await productCategory.save();
    
      res.json({
        success: true,
        message: "Product Category Created Successfully",
        data: savedProductCategory,
      });
    }catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  
  };