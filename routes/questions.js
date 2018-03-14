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
    var answer1 = req.body.answer1;
    var answer2 = req.body.answer2;
    var answer3 = req.body.answer3;
    var newQuestion = {title:title, description:description,questionContent:questionContent,education:education,author:author, rating:rating, xpReward:xpReward}
    //console.log(newQuestion);
    //create a new question and save to DB
    Question.create(newQuestion, function(err, questionVar){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            middleware.createAnswer(answer1, answer2, answer3, questionVar);
            //console.log("questionVar is NOW " + questionVar);
        }
    })
    //console.log("Before I redirect2, question is" + newQuestion)
    res.redirect("/questions");
})

//Questions Show Route
router.get("/:id", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).populate("answers").exec(function(err, foundQuestion){
        if(err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            res.render("questions/show", {question:foundQuestion})
        }
    });
});

//Question Education get route
router.get("/:id/education", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(err);
        } else {
            res.render("questions/education", {question:foundQuestion});
        }
    });
});

//Answer Q post route
router.post("/:id", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id).exec(function(err, foundQuestion){
        if(err){
            console.log(req.params.id);
            console.log(err.message);
            res.redirect("/:id")
        } else {
            console.log(req.params.id);
            res.redirect("/questions")
        }
    })
})

module.exports = router;