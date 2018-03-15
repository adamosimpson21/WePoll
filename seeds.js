var mongoose = require("mongoose");
var Question = require("./models/question");
var Answer = require("./models/answer");
var middleware = require("./middleware/index");

var data= [
    {
        title: "Favorite Color",
        questionContent: "What is your favorite Color?",
        rating: 100,
        author: {
            // id: {
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref: "User"
            // },
            // username:String
        },
        description: "How colorful",
        xpReward: 1,
        education: "https://en.wikipedia.org/wiki/Color",
        answers:[["Blue",0],["Red",0],["Periwinkle",0]]
    },
    {
        title: "Favorite Programmer",
        questionContent: "Who is your favorite Programmer?",
        rating: 100,
        author: {
            // id: {
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref: "User"
            // },
            // username:String
        },
        description: "Programmers are cool",
        xpReward: 1,
        education: "https://en.wikipedia.org/wiki/Computer",
        answers: [["Bill Gates",0],["Alan Turing",0],["Your Brother",0]]
    },
    {
        title: "Cool Dude",
        questionContent: "Who is a cool dude",
        rating: 100,
        author: {
            // id: {
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref: "User"
            // },
            // username:String
        },
        description: "Mah Dude",
        xpReward: 100,
        education: "https://en.wikipedia.org/wiki/Man",
        answers: [["Mah Dude",0],["Ya Boi",0],["Yo Dawg",0]]
    },
]

//clear, then seed DB
function seedDB(){
    //clear DB
    Question.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Removed Questions")
            data.forEach(function(seed){
                Question.create(seed, function(err, question){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a question");
                    //middleware
                    // var answer1 = "First Answer"
                    // var answer2 = "Second Answer"
                    // var answer3 = "Third Answer"
                    // middleware.createAnswer2(answer1,question);
                    // middleware.createAnswer2(answer2,question);
                    // middleware.createAnswer2(answer3,question);
                    //console.log("Answers Created");
                }
                })
            })
        }
    })
}

module.exports=seedDB;