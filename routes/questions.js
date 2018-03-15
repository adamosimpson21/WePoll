var express = require("express");
var router = express.Router();
var Question = require("../models/question");
var Answer = require("../models/answer");
var middleware = require("../middleware/index");

//Question Index Route
router.get("/", function(req, res){
    //Get all questions from DB
    Question.find({}, function(err, allQuestions){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("questions/index", {questions:allQuestions});
        }
    })
})

//Question New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("questions/new")
})

//Question Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
    //getting data from form
    var title = req.body.title;
    var description = req.body.description;
    var questionContent = req.body.questionContent;
    var education = req.body.education;
    var author = {};
    var rating = 1;
    var xpReward = 100;
    var answer1 = req.body.answer1.text;
    var answer2 = req.body.answer2.text;
    var answer3 = req.body.answer3.text;
    var newQuestion = {title:title, description:description,questionContent:questionContent,education:education,author:author, rating:rating, xpReward:xpReward, answers:[answer1,answer2,answer3]}
    //console.log(newQuestion);
    //create a new question and save to DB
    Question.create(newQuestion, function(err, questionVar){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            //console.log(questionVar);
            questionVar.save();
        }
    })
    res.redirect("/questions");
})

//Questions Show Route
router.get("/:id", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            //check to see if User has answered question
            if(middleware.hasAnswered(req.user, foundQuestion)){
                req.flash("error", "You've answered this question already");
                res.redirect("/questions");
            } else{
                res.render("questions/show", {question:foundQuestion})
            }
        }
    });
});

//Question Education get route
router.get("/:id/education", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(err);
        } else {
            // if(middleware.hasAnswered(req.user, foundQuestion)){
            //     req.flash("error", "You've answered this question already");
            //     res.redirect("/questions");
            // } else{
               res.render("questions/education", {question:foundQuestion})
            // }
        }
    });
});

//Answer Q post route
router.post("/:id", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            //console.log(req.params.id);
            //console.log(err.message);
            res.redirect("/:id")
        } else {
            //console.log(middleware.hasAnswered(req.user, foundQuestion));
            var newAnswer=req.body.answerChoice;
            middleware.logAnswer(newAnswer, foundQuestion, req.user)
        }
            res.redirect("/questions/"+ req.params.id+"/results");
        }
    )
})

//Question Results Route
router.get("/:id/results", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(err);
            res.redirect("/questions")
        } else {
            res.render("questions/results", {question:foundQuestion});
        }
    })
})

module.exports = router;