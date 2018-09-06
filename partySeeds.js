var mongoose = require("mongoose");
var Party = require("./models/party");

var partyData = [
    {
        name: "Progressive Party",
        president:{},
        description: "We believe in making incremental changes to our government in the name of progress",
        image: "https://static.wixstatic.com/media/063133_6de5232e62a0455d98199220d4aeb8e7~mv2.jpg/v1/fill/w_600,h_200,al_c,q_80,usm_0.66_1.00_0.01/063133_6de5232e62a0455d98199220d4aeb8e7~mv2.webp",
        level: 1,
        partyLine:[]
    },
    {
        name: "Conservative Party",
        president:{},
        description: "We believe that the founders described the best government, and we should stick close to those principles",
        image: "https://static.wixstatic.com/media/063133_a00f41fcd7234ff7aa53fb6db0c75d99~mv2.jpg/v1/fill/w_600,h_199,al_c,q_80,usm_0.66_1.00_0.01/063133_a00f41fcd7234ff7aa53fb6db0c75d99~mv2.webp",
        level: 1,
        partyLine:[]
    },
    {
        name: "Moderate Party",
        president:{},
        description: "We believe that compromise between all parties leads to the most agreeable government",
        image: "https://static.wixstatic.com/media/063133_fddcff739bf047cfaddbeef7d745a945~mv2.jpg/v1/fill/w_600,h_200,al_c,q_80,usm_0.66_1.00_0.01/063133_fddcff739bf047cfaddbeef7d745a945~mv2.webp",
        level: 1,
        partyLine:[]
    },
    {
        name: "Socialist Party",
        president:{},
        description: "We believe that government should actively try to help and protect its citizens",
        image: "https://static.wixstatic.com/media/063133_57ecd9cd92444625af59641277566f08~mv2.jpg/v1/fill/w_600,h_200,al_c,q_80,usm_0.66_1.00_0.01/063133_57ecd9cd92444625af59641277566f08~mv2.webp",
        level: 1,
        partyLine:[]
    },
    {
        name: "Religous Party",
        president:{},
        description: "We believe that the best government was described in our Religious text and should follow religious principles",
        image: "https://static.wixstatic.com/media/063133_6627bc0e439642afb7a3517598f4ebd0~mv2.jpg/v1/fill/w_600,h_199,al_c,q_80,usm_0.66_1.00_0.01/063133_6627bc0e439642afb7a3517598f4ebd0~mv2.webp",
        level: 1,
        partyLine:[]
    },
    {
        name: "Libertarian Party",
        president:{},
        description: "We believe in abundant freedom and the capability of the free market and that government should stay out of the way",
        image: "https://static.wixstatic.com/media/063133_e0b734ceaa71436bbf33e3049d6d1c2f~mv2.jpg/v1/fill/w_600,h_200,al_c,q_80,usm_0.66_1.00_0.01/063133_e0b734ceaa71436bbf33e3049d6d1c2f~mv2.webp",
        level: 1,
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
