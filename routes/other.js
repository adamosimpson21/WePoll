var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose");
    
//Shop Index Route
router.get("/shop", function(req, res){
    res.render("shop/index");
})

//Settings Index Route
router.get("/settings", function(req, res){
    res.render("settings/index");
})

//Main Menu Index Route
router.get("/mainmenu", function(req, res){
    res.render("mainmenu/index");
})

//Party Index Route
router.get("/party", function(req, res){
    res.render("party/index");
})
    
module.exports = router;