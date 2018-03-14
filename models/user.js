var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//User Schema Setup
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    image: String,
    settings: {},
    party: {},
    questions: {},
    coins: Number,
    inventory: {}
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);