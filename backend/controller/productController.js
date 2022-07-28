const Product = require('../models/prductModel')
const ErrorHandler = require("../util/errorhandler");

//create products 
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
    
    res.status(201).json({
        status: 'success', 
        product
    })
    }
    catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
    }
}

//get products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
  res.status(200).json({
    status: "success",
      data: {
        products :products
    }
  });
    } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err
        });
    }    
};

//get product By id
exports.getProductDetails = async(req, res, next) => {
    // try {
      let product = await Product.findById(req.params.id)

  if (!product) {
    // return next(new ErrorHandler("Product not found", 404));
    console.log("n")
  }
    res.status(200).json({
      status: "success",
      data: {
        product
      },
    });
    }
    // catch (err) {
    //      return next(new ErrorHandler("Product not found", 404));
    // }
//}

//update product -- Admin 
exports.updateProducts = async (req, res, next) => {
    try{
        let product = await Product.findById(req.params.id)
    
    if (!product) {
        return res.status(404).json({
            status: "fail",
            message: "no product found"
        })

    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
        res.status(200).json({
          status: "success",
          data: {
            product: product,
          },
        })
    } catch (err) {
         res.status(404).json({
           status: "fail",
           message: err,
         });
   }
}

// delete product ---Admin
exports.deleteProducts = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "no product found",
      });
    }
    await product.remove();
    
    res.status(200).json({
      status: "success",
      message: "product deleted"
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

};