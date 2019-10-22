const mongoose = require("mongoose");
const joi = require("@hapi/joi");


let subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 }
  });
  let subCategory = mongoose.model("subCategory", subCategorySchema);

  let categorySchema = new mongoose.Schema({
    catName: { type: String, required: true, minlength: 3, maxlength: 30 },
    subCat: [subCategorySchema]
  });
  let category = mongoose.model("Category", categorySchema);

  let productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    image: { type: String, required: true, minlength: 3, maxlength: 30 },
    description: { type: String, required: true, min: 3, max: 200 },
    price: { type: Number, required: true, minlength: 1 },
    offerprice: { type: Number, required: true, minlength: 1 },
    isAvailable: { type: Boolean, required: true },
    isTodayOffer: { type: Boolean, required: true },
    category: { type: String, required: true, minlength: 3, max: 100 },
    subCategory: { type: String, required: true, minlength: 3, max: 100 },
    isAdmin: { type: Boolean },
    recordDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
  });
  let productModel = mongoose.model("productRecord", productSchema);

  function ValidationError(message) {
    let Schema = joi.object().keys({
      catName: joi
        .string()
        .required()
        .min(3)
        .max(30),
      subCatId: joi.required()
    });
    return Schema.validate(message);
  }
  
  module.exports = { subCategory, category, productModel, ValidationError };
    