const express = require("express");
const router = express.Router();


let product = require("../schema/productModel");


router.post("/addProduct", async (req, res) => {
    let { error } = product.ValidationError(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }
    let name = await product.productModel.findOne({
      name: req.body.name
    });
    if (name) {
      return res.status(401).send({ message: "Product already exists" });
    }
    let data = new product.productModel({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      offerprice: req.body.offerprice,
      isAvailable: req.body.isAvailable,
      isTodayOffer: req.body.isTodayOffer,
      category: req.body.category,
      subCategory: req.body.subCategory,
      isAdmin: req.body.isAdmin,
      recordDate: req.body.recordDate,
      updateDate: req.body.updateDate
    });
    let items = await data.save();
    res.send({ data: items });
  });

  
router.get("/allProducts", async (req, res) => {
    let product = await product.productModel.find({});
    res.send(product);
  });

  
router.get("/findProductById/:id", async (req, res) => {
    let prod = await product.productModel.findById({ _id: req.params.id });
    if (!prod) {
      return res.status(401).send("Invalid product id");
    }
    res.send(prod);
  });

  
  
router.delete("/deleteProductById/:id", async (req, res) => {
    let prod = await product.productModel.findById({ _id: req.params.id });
    if (!prod) {
      return res.status(401).send({ message: "Invalid id" });
    }
    let items = await product.productModel.findByIdAndRemove({
      _id: req.params.id
    });
  
    let rdata = await items.save();
    res.send({ message: "Removed the product sucessfully", data: rdata });
  });
  
  module.exports = router;
  
