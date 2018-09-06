var mongoose = require("mongoose");
var User = require("./models/user");
var middleware = require("./middleware/index");
var usersData = require("./data/userData");


//clear, then seed Users
// function seedUsers(num){
//         usersData.generateUsers(num,usersData.userGenerateMethod){
//             data.forEach(function(seed){
//             console.log(`seed is ${seed.username}`)
//             User.create(seed, function(err, createdUser){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(`Added user ${createdUser}`);
//                 }
//             })
//         })
//     }
// }

// module.exports=seedUsers;
