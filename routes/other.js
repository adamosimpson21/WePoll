var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    Item = require("../models/item"),
    middleware = require("../middleware/index"),
    Party = require("../models/party");
    
//Shop Index Route
router.get("/shop", middleware.isLoggedIn, function(req, res){
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("shop/index", {items:allItems});
        }
    })
});

//Settings Index Route
router.get("/settings", function(req, res){
    res.render("settings/index");
});

//Main Menu Index Route
router.get("/mainmenu", function(req, res){
    res.render("mainmenu/index");
});

//Party Index Route
router.get("/party", function(req, res){
    //Get all parties from DB
    Party.find({}, function(err, allParties){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("party", {parties:allParties});
        }
    });
});

//Party Show Route
router.get("/party/:id", middleware.isLoggedIn, function(req, res){
    Party.findById(req.params.id).exec(function(err, foundParty){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("party/show", {party:foundParty});
        }
    });
});

//Profile Index Route
router.get("/profile", middleware.isLoggedIn, function(req, res){
    res.render("profile/index");
})

    
module.exports = router;