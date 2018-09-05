//generate a large number of users for testing purposes
var faker = require("faker");
var middleware = require("../middleware/index");
var mongoose = require("mongoose");
var Question = require("../models/question");
var makeFakerNames = require("./fakerUserNames");

var generateUsers = function(number, userGenerator){
    // console.log("Beginning generateUsers")
    var userData = [];
    //loop number times
    for(var i=0;i<number;i++){
        //make a User object with properties
        var user = userGenerator();
        // console.log(`user is ${user}`)
        //add questions
        // console.log("About to add Questions to User");
        randomQuestions(user);
        userData.push(user);
    }
    // console.log("returning userData")
    return userData;
}


//log Answer function
var logAnswer = function(answer, question, user){
                // console.log(`in logAnswer question is ${question}`);
                var storedAnswer = [question._id,answer];
                //increment answer tally
                for(var i=0; i<question.answers.length; i++){
                    if(question.answers[i][0]==(answer)){
                        question.answers[i][1] =question.answers[i][1]+1;
                        Question.findByIdAndUpdate(question._id, question, function(err, foundQuestion2){
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                }
            // console.log("About to push Answer " + storedAnswer);
            user.questions.push(question._id)
            user.answers.push(storedAnswer)
        }
                
                
//random answered questions
function randomQuestions(user){
    // var possibleIDs = [ ["5b1b1f680fb14600142a902f","Blue","Red","Periwinkle","White","Black","Green"],
    //                     ["5b1b1f680fb14600142a9030","Bill Gates","Alan Turing","BandsWithLegends"],
    //                     ["5b1b1f680fb14600142a9031","It's Great!","It's Alright","Needs some Improvement"],
    //                     ["5b1b1f680fb14600142a9032","Better Questions/Answers","Question Categories","Make it Pretty"]
    //                 ];
    // possibleIDs.forEach(function(question, index){
        // console.log(`question is ${question}`);
        // console.log(`questionid is ${question[0]}`);
        Question.find({}, function(err, foundQuestion){
            if(err){
                console.log(err)
            }
            foundQuestion.forEach(function(foundEachQuestion, index){
                // console.log(`foundEachQuestion is ${foundEachQuestion}`);
                var randomIndex = Math.floor(Math.random()*(foundEachQuestion.answers.length));
                var answerChoice = foundEachQuestion.answers[randomIndex][0];
                // console.log("About to logAnswer. answerChoice is " + answerChoice);
                logAnswer(answerChoice, foundEachQuestion, user);
            })
        })
    // })
}

//random username
function randomUserName(){
    return faker.internet.userName();
}


//random password
function randomPassword(){
    return faker.internet.password();
}

//random coins between 0 and 100
function randomCoins(){
    return Math.floor(Math.random()*101);
}

//generate random amount of experience between 0 and 3000
function randomXp(){
    return Math.floor(Math.random()*61)*50;
}

//random age between 14 and 150
function randomAge(){
    return Math.floor(Math.random()*137)+13;
}

//random race from selected list
function randomRace(){
    var possibleRaces = ['White', 'Black', 'Native American', 'Hispanic', 'Other', 'Not Specified'];
    var randomIndex = Math.floor(Math.random()*possibleRaces.length);
    return possibleRaces[randomIndex];
}

//random income between 0 and 150K, steps by 1000
function randomIncome(){
    return Math.floor(Math.random()*151)*1000;
}

//random gender from selected list
function randomGender(){
    var possibleGenders = ['Male', 'Female', 'Other', 'Choose not to say', 'Not Specified'];
    var randomIndex = Math.floor(Math.random()*possibleGenders.length);
    return possibleGenders[randomIndex];
}

//random education from selected list
function randomEducation(){
    var possibleEducation = ['Masters', 'Bachelors', 'High School', 'Less than High School', 'Not Specified'];
    var randomIndex = Math.floor(Math.random()*possibleEducation.length);
    return possibleEducation[randomIndex];
}

//random location from selected list
function randomLocation(){
    var possibleLocation = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    var randomIndex = Math.floor(Math.random()*possibleLocation.length);
    return possibleLocation[randomIndex];
}

//random family Size between 1 and 10
function randomFamilySize(){
    return Math.floor(Math.random()*10)+1;
}


var userGenerateMethod = function(){
    return {
        username: randomUserName(),
        password: randomPassword(),
        image: String,
        settings: [],
        questions: [],
        answers: [],
        coins: randomCoins(),
        experience: randomXp(),
        inventory: [],
        age: randomAge(),
        race: randomRace(),
        income: randomIncome(),
        gender: randomGender(),
        education: randomEducation(),
        location: randomLocation(),
        familySize: randomFamilySize() 
    }
}

module.exports.generateUsers = generateUsers;
module.exports.userGenerateMethod = userGenerateMethod;