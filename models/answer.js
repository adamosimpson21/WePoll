var mongoose = require("mongoose");


//placeholder answer model for future use
var answerSchema = mongoose.Schema({
    text:String
})

module.exports = mongoose.model("Answer", answerSchema)