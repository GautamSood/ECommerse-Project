const express = require("express");
const app = express()
const morgan = require("morgan");

 
app.use(morgan("dev"))
app.use(express.json())

//Imported Routes
const product = require("./routes/productRoutes")
const ErrorMiddleware = require("./middleware/error")


app.use("/api", product);

//error handled
app.use(ErrorMiddleware);

module.exports = app
