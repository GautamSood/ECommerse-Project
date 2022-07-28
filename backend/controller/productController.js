const Product = require('../models/prductModel')
const ErrorHandler = require("../util/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError")
//create products 
exports.createProduct = CatchAsyncError(async (req, res) => {
  
        const product = await Product.create(req.body)
    
    res.status(201).json({
        status: 'success', 
        product
    })
  
})

//get products
exports.getAllProducts = CatchAsyncError(async (req, res) => {
    
        const products = await Product.find()
  res.status(200).json({
    status: "success",
      data: {
        products :products
    }
  });
       
})

//get product By id
exports.getProductDetails = CatchAsyncError( async(req, res, next) => {
    // try {
      let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
   
  }
    res.status(200).json({
      status: "success",
      data: {
        product
      },
    });
    })
    // catch (err) {
    //      return next(new ErrorHandler("Product not found", 404));
    // }
//}

//update product -- Admin 
exports.updateProducts = CatchAsyncError(async (req, res, next) => {
   
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
    
})

// delete product ---Admin
exports.deleteProducts = CatchAsyncError(async (req, res, next) => {
 
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


})