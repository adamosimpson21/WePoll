//MiddleWare Index
var Question = require("../models/question");
var middlewareObj={};
var mongoose = require("mongoose");
var express = require("express");
var Answer = require("../models/answer");


middlewareObj.createAnswer= function createAnswer(answer1, answer2, answer3, question){
    Answer.create(answer1, function(err, answerCreated){
        if(err){
            console.log(err);
        } else {
            answerCreated.save();
            //console.log("answerCreated is " + answerCreated);
            question.answers.push(answerCreated._id);
            //question.save();
            //console.log("The question is currently " + question);
        }
    });
    Answer.create(answer2, function(err, answerCreated){
        if(err){
            console.log(err);
        } else {
            answerCreated.save();
            //console.log("answerCreated is " + answerCreated);
            question.answers.push(answerCreated._id);
            //question.save();
            //console.log("The question is currently " + question);
        }
    });
    Answer.create(answer3, function(err, answerCreated){
        if(err){
            console.log(err);
        } else {
            answerCreated.save();
            //console.log("answerCreated is " + answerCreated);
            question.answers.push(answerCreated._id);
            question.save();
            //console.log("The question is currently " + question);
        }
    });
};

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Log In to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;