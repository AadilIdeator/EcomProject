const express = require("express");
const router = express.Router();

let category = require("../schema/productModel");



router.post("/addCategory", async (req, res) => {
    let { error } = category.ValidationError(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }
    let subCat = await category.subCategory.findById(req.body.subCatId);
    if (!subCat) {
      return res.status(402).send("Invalid subcategory Id");
    }
    let name = await category.category.findOne({
      catName: req.body.catName
    });
    if (name) {
      return res.status(401).send({ message: "Category already exists" });
    }
    let data = new category.category({
      catName: req.body.catName,
      subCat: {
        _id: subCat._id,
        name: subCat.name
      }
    });
    let items = await data.save();
    res.send({ data: items });
  });
  

  
router.get("/allCategory", async (req, res) => {
    let category = await category.category.find({});
    res.send(category);
  });

  
  
router.get("/findCategoryById/:id", async (req, res) => {
    let cat = await category.category.findById({ _id: req.params.id });
    if (!cat) {
      return res.status(401).send("Invalid category id");
    }
    res.send(cat);
  });

  
router.delete("/deleteCategoryById/:id", async (req, res) => {
    let cat = await category.category.findById({ _id: req.params.id });
    if (!cat) {
      return res.status(401).send({ message: "Invalid id" });
    }
    let items = await category.category.findByIdAndRemove({ _id: req.params.id });
  
    let rdata = await items.save();
    res.send({ message: "Removed the category sucessfully", data: rdata });
  });
  
  module.exports = router;
  