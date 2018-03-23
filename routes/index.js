var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var mongoose = require("mongoose");
var User = require("../models/user");

//Landing route
router.get("/", function(req, res){
    res.render("landing");
})


//Login Index Route
router.get("/login", function(req, res){
    res.render("login");
})


//Handle LogIn form Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/questions",
        failureRedirect:"/login",
        successFlash: "Welcome to WePoll",
        failureFlash: true
    }), function(req, res){

});

//Register Index Route
router.get("/register", function(req, res){
    res.render("register");
})

//SignUp Logic
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username, coins:5, avatar:"https://freeclipartimage.com//storage/upload/human-clipart/human-clipart-15.png", experience:0});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to WePoll "+ user.username)
            // console.log(user)
            res.redirect("/questions");
        })
    })
})


//Log Out Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully Logged out!")
    res.redirect("/");
});



module.exports = router;
