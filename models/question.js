var mongoose = require("mongoose");

//Schema Setup
var questionSchema = new mongoose.Schema({
    title: String,
    questionContent: String,
    rating: Number,
    author: {
        // id: {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        // username:String
    },
    description: String,
    xpReward: Number,
    education: String,
    answers: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Answer"
        }
    ]
})

module.exports = mongoose.model("Question", questionSchema);