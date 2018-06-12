var mongoose = require("mongoose");
var User = require("./models/user");
var middleware = require("./middleware/index");
var usersData = require("./data/userData");


//clear, then seed Users
function seedUsers(num){
    console.log(`num is ${num}`)
    if(num==0){
        console.log(`done seeding Users ${num}`)
        return null
    }
    var data= usersData.generateUsers(num,usersData.userGenerateMethod);
    data.forEach(function(seed){
        User.create(seed, function(err, question){
            if(err){
                console.log(err);
            } else {
                console.log("added a user");
                seedUsers(num-1);
            }
        })
    })
}

module.exports=seedUsers;