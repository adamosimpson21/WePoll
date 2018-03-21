var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//User Schema Setup
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    image: String,
    settings: [],
    party: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Party"
    },
    questions: [],
    coins: Number,
    experience: Number,
    inventory: [
        {
           type:mongoose.Schema.Types.ObjectId,
           ref: "Item"
        }],
    avatar:String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);