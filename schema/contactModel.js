const mongoose = require('mongoose');
let contactSchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:5,maxlength:50},
    email:{type:String,required:true,minlength:5,maxlength:50},
    message:{type:String,required:true,minlength:5,maxlength:50}
});

let contacts = mongoose.model('contacts',contactSchema);
module.exports = contacts;