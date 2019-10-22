let mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
    prodId: { type: String, required: true, minlength: 3, maxlength: 100 },
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    image: { type: String, required: true, minlength: 3, maxlength: 30 },
    price: { type: Number, required: true, minlength: 1, maxlength: 10 },
    quantity: { type: Number, required: true, minlength: 1, maxlength: 10 },
    totalPrice: { type: Number, required: true, minlength: 1, maxlength: 10 },
    recordDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
  });

  let cartItemRecords = mongoose.model("cartItemRecords", cartItemSchema);

  
let userCartSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, minlength: 3, maxlength: 30 },
    cartItem: [cartItemSchema]
  });
  let userCartItem = mongoose.model("userCartItem", userCartSchema);


  module.exports = { cartItemRecords, userCartItem };
  
  
  
