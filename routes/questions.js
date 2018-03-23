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
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var rating = 1;
    var xpReward = 100;
    //variable Answer
    var numberOfAnswers = req.body.numberOfAnswers
    var answers = []
    for(var i=0; i<numberOfAnswers; i++){
        answers.push([req.body.answer[i],0])
    }
    var newQuestion = {title:title, description:description,questionContent:questionContent,education:education,author:author, rating:rating, xpReward:xpReward, answers:answers}
    //create a new question and save to DB
    Question.create(newQuestion, function(err, questionVar){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            //console.log(questionVar);
            req.flash("success", "Question created successfully")
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
                res.redirect("/questions/"+req.params.id+"/results");
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
            console.log(err.message);
            res.redirect("/questions/"+req.params.id);
        } else {
            //console.log(middleware.hasAnswered(req.user, foundQuestion));
            var newAnswer=[req.body.answerChoice,0];
            middleware.logAnswer(newAnswer, foundQuestion, req.user, req)
            res.redirect("/questions/"+ req.params.id+"/results");
        }
    })
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

//Question Edit Route
router.get("/:id/edit", function(req, res){
    Question.findById(req.params.id, function(err, foundQuestion){
        if(err){
            console.log(err);
            res.redirect("/questions");
        } else {
            res.render("questions/edit", {question:foundQuestion});
        }
    });
});

//Question Update Route
router.put("/:id", function(req, res){
    //find and update the correct question
    Question.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Question not deleted: " + err.message);
            res.redirect("/questions");
        } else {
            var title = req.body.title;
            var description = req.body.description;
            var questionContent = req.body.questionContent;
            var education = req.body.education;
            var author = {
                id:req.user._id,
                username:req.user.username
            };
            var rating = 1;
            var xpReward = 100;
            var answer1 = [req.body.answer1,0];
            var answer2 = [req.body.answer2,0];
            var answer3 = [req.body.answer3,0];
            var newQuestion = {title:title, description:description,questionContent:questionContent,education:education,author:author, rating:rating, xpReward:xpReward, answers:[answer1,answer2,answer3]}
            //console.log(newQuestion);
            //create a new question and save to DB
            Question.create(newQuestion, function(err, questionVar){
                if (err){
                    console.log(err)
                    req.flash("error", err.message);
                } else {
                    //console.log(questionVar);
                    req.flash("success", "Question updated successfully")
                    questionVar.save();
                }
            })
            res.redirect("/questions");    
        }
    })
    // // Question.findByIdAndUpdate(req.params.id, req.body.question, function(err, updatedQuestion){
    //     if(err){
    //         console.log(err);
    //         res.redirect("/questions");
    //     } else {
    //         // console.log("req.body.answer1 is " + req.body.answer1)
    //         var answer1 = [req.body.answer1,0];
    //         var answer2 = [req.body.answer2,0];
    //         var answer3 = [req.body.answer3,0];
    //         updatedQuestion.answers= [answer1,answer2,answer3];
    //         updatedQuestion.save();
    //         // console.log("updatedQuestion is " + updatedQuestion)
    //         res.redirect("/questions/" + req.params.id);
    //     }
    // });
});

//Question Delete Route
router.delete("/:id", function(req, res){
    Question.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Question not deleted: " + err.message);
            res.redirect("/questions");
        } else {
            req.flash("success", "Question deleted!");
            res.redirect("/questions");
        }
    });
});

module.exports = router;