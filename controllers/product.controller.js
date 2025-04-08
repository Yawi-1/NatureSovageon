const Product = require("../models/product.model");
const uploadOnCloudinary = require("../config/cloudinary");

const addProduct = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.json({ message: "Image is required", success: false });
    }

    console.log(file)

    const imageUrl = await uploadOnCloudinary(file);
    if (!imageUrl) {
      return res.status(500).json({ message: "Failed to upload image", success: false });
    }

    const product = await Product.create({
      title,
      description,
      category,
      image: imageUrl,
    });

    res.status(201).json({
      data: product,
      message: "New Product Added Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({
      data: {
        products,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      message: "Products Fetched Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getSingleProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product Not Found",success:false});
        }
         res.json({data:product,message:'Single Product Fetched.',success:true})
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}


module.exports = { addProduct, getAllProducts,getSingleProduct };
