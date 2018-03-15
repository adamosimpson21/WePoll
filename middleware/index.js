//MiddleWare Index
var Question = require("../models/question");
var middlewareObj={};
var mongoose = require("mongoose");
var express = require("express");
var Answer = require("../models/answer");


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
    // Answer.create(answer, function(err, answerLogged){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(answer);
    //         answerLogged.save();
    //         user.questions.push(answerLogged._id)
    //         user.save();
    //         console.log(user)
    //     }
    // })
    var storedAnswer = [question._id,answer];
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