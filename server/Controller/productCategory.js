import ProductCategory from './../models/ProductCategory.js';

// POST productCategory = create productCategory 

export const postProductCategory = async (req, res) => {
    const { categoryType, categoryTitle, itemImgURL } = req.body;

    // validations for productCategory
    const emptyCategory = []

    if (!categoryType) emptyCategory.push('Category Type')
    if (!categoryTitle) emptyCategory.push('Category Title')
    if (!itemImgURL) emptyCategory.push('ImgURL')

    if (emptyCategory.length > 0) {
        return res.json({
            success: false,
            message: `${emptyCategory.join(' , ')} Required !`
        });
    }

    try {
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
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }

};

// GET producctCategory?title => get productCategory by title 
export const getProductCategory = async (req, res) => {
    try {
        const { title } = req.query;

        const productCategory = await ProductCategory.find({
            title: { $regex: title, $options: 'i' }
        });

        res.json({
            success: true,
            description: "Product category  fetched successfully",
            data: productCategory,
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }

}

// PUT productCategoy/:id => update productCategoy by id
export const getProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find();

        res.json({
            success: true,
            description: "Product category  fetched successfully",
            results: productCategories.length,
            data: productCategories,
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }

}
