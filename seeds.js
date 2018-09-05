var mongoose = require("mongoose");
var Question = require("./models/question");
var middleware = require("./middleware/index");

var data= [
    {
        _id:"5b1b1f680fb14600142a902f",
        title: "Favorite Color",
        questionContent: "What is your favorite Color?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "How colorful",
        xpReward: 150,
        tags:[],
        education: "https://en.wikipedia.org/wiki/Color",
        answers:[["Orange",2],["Red",4],["Periwinkle",6],["White",10],["Black",1],["Green",0]]
    },
    {
        _id:'5b1b1f680fb14600142a9030',
        title: "Favorite Programmer",
        questionContent: "Who is your favorite Programmer?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Programmers are cool",
        xpReward: 150,
        tags:["General", "Technology", "Computers"],
        education: "https://en.wikipedia.org/wiki/Computer",
        answers: [["Bill Gates",0],["Alan Turing",0],["BandsWithLegends",0]]
    },
    {
        _id:"5b1b1f680fb14600142a9031",
        title: "WePoll FeedBack",
        questionContent: "What do you think of the site so far?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Help me help you!",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["It's Great!",0],["It's Alright",0],["Needs some Improvement",0]]
    },
    {
        _id:"5b1b1f680fb14600142a9032",
        title: "Future Plans",
        questionContent: "What would you like to see in the future of WePoll?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Help me (BandsWithLegends) improve the site",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["Better Questions/Answers",0],["Question Categories",0],["Make it Pretty",0]]
    },
        {
        title: "Your Progress",
        questionContent: "What Level are you in WePoll?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Let me know how far you've gotten",
        xpReward: 150,
        education: "https://powerful-escarpment-46699.herokuapp.com/",
        answers: [["Level 1",0],["Level 2-5",0],["Level 6+",0]]
    },
        {
        title: "Pizza Toppings",
        questionContent: "What's the best topping to put on pizza?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Let's put a century's old debate to rest",
        xpReward: 150,
        education: "https://en.wikipedia.org/wiki/Pizza",
        answers: [["Just Cheese",0],["Pepperoni",0],["Pineapple",0]]
    },
        {
        title: "The Dress",
        questionContent: "What color is this dress?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "The Dress",
        xpReward: 150,
        education: "https://en.wikipedia.org/wiki/The_dress",
        answers: [["Black and Black",0],["White and Gold",0],["Who. Cares.",0]]
    },
    {
	    title: "Fed Reg of Firearms",
        questionContent: "Should firearms be regulated by the Federal government?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should firearms be regulated by the Federal government?",
        xpReward: 150,
        tags:["General", "Federal", "Firearms"],
        education: "https://en.wikipedia.org/wiki/Gun_control",
        answers: [["Yes",0],["Only some",0],["By state gov",0],["No",0]]
},
{
    	title: "Fed Reg of Ammo",
        questionContent: "Should ammunition be regulated by the federal government?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should ammunition be regulated by the Federal government?",
        xpReward: 150,
        tags:["General", "Federal", "Firearms"],
        education: "https://en.wikipedia.org/wiki/Ammunition",
        answers: [["Yes",0],["Only some",0],["By state gov",0],["No",0]]
},
{
    	title: "Fed Reg of Nonlethals",
        questionContent: "Should nonlethal ranged weapons be regulated by the federal government?(taser,bow,pepper spray)",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should nonlethal ranged weapons be regulated by the federal government?(taser,bow,pepper spray)",
        xpReward: 150,
        tags:["General", "Federal", "Firearms"],
        education: "https://en.wikipedia.org/wiki/Taser",
        answers: [["Yes",0],["Only some",0],["By state gov",0],["No",0]]
},
{
        title: "Fed Reg of Swords",
        questionContent: "Should close combat weapons be regulated by the federal government? (sword, knife, bat)",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should close combat weapons be regulated by the federal government? (sword, knife, bat)",
        xpReward: 150,
        tags:["General", "Federal", "Firearms"],
        education: "https://en.wikipedia.org/wiki/Sword",
        answers: [["Yes",0],["Only some",0],["By state gov",0],["No",0]]
},
{
        title: "Voting Equality",
        questionContent: "Should each person voting in a federal election have the same & equal value for their vote?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should each person voting in a federal election have the same & equal value for their vote?",
        xpReward: 150,
        tags:["General", "Voting", "Equality"],
        education: "https://en.wikipedia.org/wiki/Voting",
        answers: [["Yes",0],["Should be a way to earn more",0],["Some people should have more value than others",0],["No one should vote",0]]
},
{
        title: "Who can vote?",
        questionContent: "Which groups of people should be block from voting in a federal election?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Which groups of people should be block from voting?",
        xpReward: 150,
        tags:["General", "Voting", "Equality"],
        education: "https://en.wikipedia.org/wiki/Voting",
        answers: [["Children",0],["Convicted Criminals",0],["Racial or Religious or Gender group",0],["No one should be blocked from voting",0]]
},
{
        title: "How to vote",
        questionContent: "What is the best way for a citizen to cast a vote in a federal election?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "What is the best way for a citizen to cast a vote in a federal election?",
        xpReward: 150,
        tags:["General", "Voting", "Technology"],
        education: "https://en.wikipedia.org/wiki/Electronic_voting",
        answers: [["In person on a paper ballot",0],["In person on an electronic system",0],["Via the internet (web, mobile)",0],["Via federal mail, the post office",0]]
},
{
    	title: "Election Day",
        questionContent: "Should election day be a federal holiday, and should employers be required to give employees the day off?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "Should election day be a federal holiday, and should employers be required to give employees the day off?",
        xpReward: 150,
        tags:["General", "Voting", "Holiday"],
        education: "https://en.wikipedia.org/wiki/Election_day",
        answers: [["Yes",0],["Holiday, but not required",0],["No holiday, but improved access to voting",0],["No",0]]
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