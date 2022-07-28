const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controller/productController");

const router = express.Router()

//get requests
router.route('/products').get(getAllProducts)
router.route("/product/:id").get(getProductDetails);

//post requests
router.route("/product/new").post(createProduct)

//update requests
router.route("/product/:id").put(updateProducts);

//delete requests
router.route("/product/:id").delete(deleteProducts);

module.exports =  router