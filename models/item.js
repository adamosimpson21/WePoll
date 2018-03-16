var mongoose = require("mongoose");

//Inventory Item (shop) Schema Setup
var ItemSchema = new mongoose.Schema({
    name:String,
    cost:Number,
    image:String,
    stack:Number
});

module.exports = mongoose.model("Item", ItemSchema);