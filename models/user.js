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
    coins: { 
                type:Number,
                default: 5
            },
    experience: { 
                    type:Number,
                    default: 0
                },
    inventory: [
        {
           type:mongoose.Schema.Types.ObjectId,
           ref: "Item"
        }
    ],
    avatar:{ 
                type:String,
                default: "https://freeclipartimage.com//storage/upload/human-clipart/human-clipart-15.png"
            },
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);