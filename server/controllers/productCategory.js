import ProductCategory from './../models/ProductCategory.js';
import responder from './../util/responder.js'


// POST productCategory = create productCategory
export const postProductCategory = async (req, res) => {
  const { categoryType, categoryTitle, itemImgURL } = req.body;

  // validations for productCategory
  const emptyCategory = [];

  if (!categoryType) emptyCategory.push('Category Type');
  if (!categoryTitle) emptyCategory.push('Category Title');
  if (!itemImgURL) emptyCategory.push('ImgURL');

  if (emptyCategory.length > 0) {
    responder(res, null, `${emptyCategory.join(' , ')} Required !`, false)
  }

  try {
    const productCategory = new ProductCategory({
      categoryType,
      categoryTitle,
      itemImgURL,
    });

    const savedProductCategory = await productCategory.save();
    responder(res, savedProductCategory,  'Product Category Created Successfully')

  } catch (err) {
    responder(res, null, err.message, false)
  }
};

// GET producctCategory?title => get productCategory by title
export const getProductCategoryTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const productCategory = await ProductCategory.find({
      title: { $regex: title, $options: 'i' },
    });
    responder(res, productCategory,   'Product category  fetched successfully')

  } catch (err) {
    responder(res, null, err.message, false)
  }
};

// GET productCategories => get productCategories
export const getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find();

    responder(res, productCategories,   'Product category  fetched successfully')

  } catch (err) {
    responder(res, null, err.message, false)
  }
};

// PUT productCategoy/:id => update productCategoy by id
export const putProductCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryType, categoryTitle, isCategoryAvailable, itemImgURL } =
      req.body;

    await ProductCategory.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          categoryType,
          categoryTitle,
          isCategoryAvailable,
          itemImgURL,
        },
      }
    );

    const updatedProductCategory = await ProductCategory.findById(id);
    responder(res, updatedProductCategory,  'Product category updated successfully')

  } catch (err) {
    responder(res, null, err.message, false)
  }
};

// DELETE productCategory/:id => delete productCategory by id
export const deleteProductCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.deleteOne({
      _id: id,
    });
    responder(res, productCategory, 'Product category deleted successfully')

  } catch (err) {
    responder(res, null, err.message, false)

  }
};