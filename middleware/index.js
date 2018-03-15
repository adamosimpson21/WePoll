//MiddleWare Index
var Question = require("../models/question");
var middlewareObj={};
var mongoose = require("mongoose");
var express = require("express");
var Answer = require("../models/answer");


//Array Equals method
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
// middlewareObj.createAnswer= function createAnswer(answer1, answer2, answer3, question){
//     Answer.create(answer1, function(err, answerCreated){
//         if(err){
//             console.log(err);
//         } else {
//             answerCreated.save();
//             //console.log("answerCreated is " + answerCreated);
//             question.answers.push(answerCreated._id);
//             //question.save();
//             //console.log("The question is currently " + question);
//         }
//     });
//     Answer.create(answer2, function(err, answerCreated){
//         if(err){
//             console.log(err);
//         } else {
//             answerCreated.save();
//             //console.log("answerCreated is " + answerCreated);
//             question.answers.push(answerCreated._id);
//             //question.save();
//             //console.log("The question is currently " + question);
//         }
//     });
//     Answer.create(answer3, function(err, answerCreated){
//         if(err){
//             console.log(err);
//         } else {
//             answerCreated.save();
//             //console.log("answerCreated is " + answerCreated);
//             question.answers.push(answerCreated._id);
//             question.save();
//             //console.log("The question is currently " + question);
//         }
//     });
// };

middlewareObj.createAnswer= function createAnswer2(answer, question){
    question.answers.push(answer);
    question.save();
}

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Log In to do that");
    res.redirect("/login");
};

middlewareObj.logAnswer = function logAnswer(answer, question, user){
    var storedAnswer = [question._id,answer];
    //increment tally
    for(var i=0; i<question.answers.length; i++){
        //console.log(question.answers);
        //console.log(answer);
        //console.log("question.answers[i] is " + question.answers[i])
        if(question.answers[i][0]==(answer[0])){
            //question.answer[i] is current answer
            console.log("finding answer tally " + question.answers[i][1])
            question.answers[i][1] =question.answers[i][1]+1;
            console.log("finding answer tally " + question.answers[i][1])
            Question.findByIdAndUpdate(question._id, question, function(err, foundQuestion2){
                if(err){
                    console.log(err)
                } else {
                    console.log("foundQuestion2 is " + foundQuestion2)
                }
            })
            //console.log(question);
        }
    }
    //console.log(storedAnswer)
    user.questions.push(storedAnswer);
    user.save();
    //console.log(user);
}

//Checks to see if a user has Answered a Question
middlewareObj.hasAnswered = function hasAnswered(user, question){
    for(var i=0; i<user.questions.length; i++){
    //loops through IDs of question that user has answered, compares with current questionID
        if (user.questions[i][0].equals(question._id)){
            //returns true if user has answered question
            return true
        }
    }
    //exits loops and returns false if user has no answered question
    return false
}

module.exports = middlewareObj;