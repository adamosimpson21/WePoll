var mongoose = require("mongoose");
var Question = require("./models/question");
var Answer = require("./models/answer");
var middleware = require("./middleware/index");

var data= [
    {
        title: "Favorite Color",
        questionContent: "What is your favorite Color?",
        rating: 100,
        author: {},
        description: "How colorful",
        xpReward: 150,
        tags:[],
        education: "https://en.wikipedia.org/wiki/Color",
        answers:[["Blue",0],["Red",0],["Periwinkle",0],["White",0],["Black",0],["Green",0]]
    },
    {
        title: "Favorite Programmer",
        questionContent: "Who is your favorite Programmer?",
        rating: 100,
        author: {},
        description: "Programmers are cool",
        xpReward: 150,
        tags:["General", "Technology", "Computers"],
        education: "https://en.wikipedia.org/wiki/Computer",
        answers: [["Bill Gates",0],["Alan Turing",0],["BandsWithLegends",0]]
    },
    {
        title: "WePoll FeedBack",
        questionContent: "What do you think of the site so far?",
        rating: 100,
        author: {},
        description: "Help me help you!",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["It's Great!",0],["It's Alright",0],["Needs some Improvement",0]]
    },
        {
        title: "Future Plans",
        questionContent: "What would you like to see in the future of WePoll?",
        rating: 100,
        author: {},
        description: "Help me (BandsWithLegends) improve the site",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["Better Questions/Answers",0],["Question Categories",0],["Make it Pretty",0]]
    },
        {
        title: "Your Progress",
        questionContent: "What Level are you in WePoll?",
        rating: 100,
        author: {},
        description: "Let me know how far you've gotten",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["Level 1",0],["Level 2-5",0],["Level 6+",0]]
    },
        {
        title: "Pizza Toppings",
        questionContent: "What's the best topping to put on pizza?",
        rating: 100,
        author: {},
        description: "Let's put a century's old debate to rest",
        xpReward: 150,
        education: "https://en.wikipedia.org/wiki/Pizza",
        answers: [["Just Cheese",0],["Pepperoni",0],["Pineapple",0]]
    },
        {
        title: "The Dress",
        questionContent: "What color is this dress?",
        rating: 100,
        author: {},
        description: "The Dress",
        xpReward: 150,
        education: "https://en.wikipedia.org/wiki/The_dress",
        answers: [["Black and Black",0],["White and Gold",0],["Who. Cares.",0]]
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
                    }
                })
            })
        }
    })
}

module.exports=seedDB;