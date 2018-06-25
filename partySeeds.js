var mongoose = require("mongoose");
var Party = require("./models/party");

var partyData = [
    {
        name: "Costume Party",
        president:{},
        description: "Come wearing your favorite outfit!",
        image: "http://partycostumehouse.com/wp-content/uploads/2016/10/2016-Costume-Ideas-Women.jpg",
        level: 1,
        partyLine:[]
    },
    {
        name: "Birthday Party",
        president:{},
        description: "Happy Birthday toooo Youuuuuuuu",
        image: "https://media0ch-a.akamaihd.net/84/90/fdc16ea96bb48af46cfb847547fa3629.jpg",
        level: 5,
        partyLine:[]
    },
    {
        name: "Surprise Party",
        president:{},
        description: "Sshhhhhhhhhh!!",
        image: "https://nightout.s3.amazonaws.com/media/posters/36516/large-6c2c6d41d9169a56.jpg?1502449924",
        level: 10,
        partyLine:[]
    }
]

function seedDBparties(){
    //clear DB
    Party.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all Parties")
            partyData.forEach(function(seed){
                Party.create(seed, function(err, party){
                    if(err){
                        console.log(err);
                    } else {
                        // console.log("party created: "+ party)
                    }
                })
            })
        }
    })
}

module.exports = seedDBparties;