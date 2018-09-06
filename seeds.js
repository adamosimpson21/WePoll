var mongoose = require("mongoose");
var Question = require("./models/question");
var middleware = require("./middleware/index");

var data= [
    {
        _id:"5b1b1f680fb14600142a902f",
        title: "First Question - Start Here!",
        questionContent: "Welcome to WePoll!  This is where the question will appear.  To see the possible answers, you must first click the link and view educational information about the topic.  Click below to learn about polls, and then tell us, How do you find polling on WePoll?",
        rating: 100,
        author: "5aad989a0355d2087a3186b8",
        description: "First Q",
        xpReward: 150,
        tags:[],
        education: "https://en.wikipedia.org/wiki/poll",
        answers:[["This works great",0],["It's confusing",0],["Don't want to click link",0],["Needs improving",0]]
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
},{
        
	title: "Marriage",

        questionContent: "Should all people be allowed to enter into marriage with any consenting partner?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should all people be allowed to enter into marriage with any consenting partner?",

        xpReward: 150,

        tags:["General", "Social", "Marriage"],

        education: "https://en.wikipedia.org/wiki/Marriage",

        answers: [["Yes",0],["Only some",0],["No",0]]

},
{
        
	title: "Marriage factor - sex",

        questionContent: "Should the sex of the couple be a determining factor on their ability to enter into a consensual marriage?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the sex of the couple be a determining factor on their ability to enter into a consensual marriage?",

        xpReward: 150,

        tags:["General", "Social", "Marriage"],

        education: "https://en.wikipedia.org/wiki/Same-sex_marriage",

        answers: [["Yes",0],["No",0]]

},
{
        
	title: "Marriage factor - age",

        questionContent: "Should the age of the couple be a determining factor on their ability to enter into a consensual marriage?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the age of the couple be a determining factor on their ability to enter into a consensual marriage?",

        xpReward: 150,

        tags:["General", "Social", "Marriage"],

        education: "https://en.wikipedia.org/wiki/Age_of_consent#Marriage_and_the_age_of_consent",

        answers: [["Yes",0],["No",0]]

},
{
        
	title: "Marriage factor - class",

        questionContent: "Should the social class or identity of the couple be a determining factor on their ability to enter into a consensual marriage?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the social class or identity of the couple be a determining factor on their ability to enter into a consensual marriage?",

        xpReward: 150,

        tags:["General", "Social", "Marriage"],

        education: "https://en.wikipedia.org/wiki/Social_class",

        answers: [["Yes",0],["No",0]]

},
{
        
	title: "Federal healthcare option",

        questionContent: "Should the fed gov ensure that all citizens have access to affordable, useful health insurance?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the fed gov ensure that all citizens have access to affordable, useful health insurance?",

        xpReward: 150,

        tags:["General", "Healthcare", "Federal"],

        education: "https://en.wikipedia.org/wiki/Publicly_funded_health_care",

        answers: [["Yes, public option",0],["Yes, regulation of private industry",0],["No",0]]
},
{
        
	title: "Healthcare by Federal Gov",

        questionContent: "Should the fed gov have a role in protecting the health of citizens?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the fed gov have a role in protecting the health of citizens?",

        xpReward: 150,

        tags:["General", "Healthcare", "Federal"],

        education: "https://en.wikipedia.org/wiki/Publicly_funded_health_care",

        answers: [["Yes, public option",0],["Yes, regulation of private industry",0],["No",0]]
},
{
        
	title: "Health protection - drugs",

        questionContent: "Should the fed gov promote health of citizens by protecting them from drugs?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should the fed gov promote health of citizens by protecting them from drugs?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/Drug",

        answers: [["Yes, all drugs",0],["Yes, only dangerous drugs",0],["No",0]]
},
{
        
	title: "Health protection - low risk drugs",

        questionContent: "Should drugs with very low risk of dangerous side effects be available without prescription?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "Should drugs with very low risk of dangerous side effects be available without prescription?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/Drug",

        answers: [["Yes",0],["Not if they give a 'high'",0],["No",0]]
},
{
        
	title: "Marijuana Regulation",

        questionContent: "How should marijuana be regulated?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "How should marijuana be regulated?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/Cannabis",

        answers: [["Totally legal",0],["Like alcohol & tobacco",0],["By state gov",0],["Medical Use Only",0],["Totally illegal",0]]
},
{
        
	title: "Caffeine Regulation",

        questionContent: "How should caffeine be regulated?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "How should caffeine be regulated?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/caffeine",

        answers: [["Totally legal",0],["Like alcohol & tobacco",0],["By state gov",0],["Medical Use Only",0],["Totally illegal",0]]
},
{
        
	title: "Alcohol Regulation",

        questionContent: "How should alcohol be regulated?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "How should alcohol be regulated?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/alcohol",

        answers: [["Totally legal",0],["Same as current",0],["By state gov",0],["Medical Use Only",0],["Totally illegal",0]]
},
{
        
	title: "Tobacco Regulation",

        questionContent: "How should tobacco be regulated?",

        rating: 100,

        author: "5b3177b56a957d00147de573",

        description: "How should tobacco be regulated?",

        xpReward: 150,

        tags:["General", "Healthcare", "Drugs"],

        education: "https://en.wikipedia.org/wiki/tobacco",

        answers: [["Totally legal",0],["Same as current",0],["By state gov",0],["Medical Use Only",0],["Totally illegal",0]]
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
    }
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