var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    Item = require("../models/item"),
    middleware = require("../middleware/index"),
    Party = require("../models/party"),
    User = require("../models/user")
    
//Shop Index Route
router.get("/shop", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id).populate("inventory").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            Item.find({}, function(err, allItems){
                if(err){
                    console.log(err);
                    req.flash("error", err.message);
                } else {
                    console.log("req.user.inventory = " + foundUser.inventory)
                    res.render("shop/index", {items:allItems, currentUser:foundUser});
                }
            })
        }
    })
});

//Shop Buy Coins Route
router.post("/shop", middleware.isLoggedIn, function(req, res){
    req.user.coins += parseInt(req.body.coinNumber);
    req.user.save();
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.redirect("/shop");
        }
    })
})

//Shop Buy Item Route
router.post("/shop/buy", middleware.isLoggedIn, function(req, res){
    //Logic goes here
    Item.findById(req.body.item, function(err, foundItem){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            function userHasItem(user, item){
                for(var i=0;i<user.inventory.length;i++){
                    console.log("user.inventory[i] = " + user.inventory[i])
                    console.log("item._id = " + item._id)
                    if(user.inventory[i].equals(item._id)){
                        console.log("returning true")
                        return true
                    }
                }
                console.log("returning false");
                return false;
            }
            //checks to see if User has item already
            if(userHasItem(req.user, foundItem)){
                req.flash("error", "You already have that item")
            } else {
                if(req.user.coins<Number(foundItem.cost)){
                    req.flash("error", "Sorry, you don't have enough coins!")
                } else {
                    req.user.coins-=Number(foundItem.cost);
                    req.user.inventory.push(foundItem._id);
                    req.user.save();
                }
            }
        }
    })
    //console.log("req.user.inventory = " + req.user.inventory)
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.redirect("/shop");
        }
    })
})

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
    User.findById(req.user._id).populate("inventory").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render("profile/index", {currentUser:foundUser});        
        }
    })
})

    
module.exports = router;