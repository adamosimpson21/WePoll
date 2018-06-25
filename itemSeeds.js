var mongoose = require("mongoose");
var Item = require("./models/item");

var itemData = [
    {
        name:"Top Hat",
        cost:1,
        image:"https://www.villagehatshop.com/photos/product/standard/4511390S61126/all/mid-crown-wool-felt-top-hat.jpg",
        stack:1
    },
    {
        name:"Blue Shirt",
        cost:2,
        image:"http://matchem.com/wp-content/uploads/2015/03/plain-blue-shirt-front-and-back-72hi3bcb.jpg",
        stack:1
    },
    {
        name:"Red Flag",
        cost:3,
        image:"https://openclipart.org/download/255282/Racing_Flag_Red.svg",
        stack:1
    },
        {
        name:"Really Sweet Bicycle",
        cost:10,
        image:"https://5.imimg.com/data5/KO/RD/MY-1665840/gutts-26-500x500.jpg",
        stack:1
    }
]

function seedDBItems(){
    //clear DB
    Item.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all Items")
            itemData.forEach(function(seed){
                Item.create(seed, function(err, item){
                    if(err){
                        console.log(err);
                    } else {
                        // console.log("item created: "+item)
                    }
                })
            })
        }
    })
}

module.exports = seedDBItems;