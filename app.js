//requiring packages
var express         = require("express"),
    app             = express(),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    Question        = require("./models/question"),
    seedDB          = require("./seeds"),
    seedUsers       = require("./userSeeds"),
    seedDBItems     = require("./itemSeeds"),
    seedDBparties   = require("./partySeeds"),
    middleware      = require("./middleware/index"),
    config          = require("./config");


//requiring routes
var questionsRoutes = require("./routes/questions"),
    indexRoutes     = require("./routes/index"),
    otherRoutes     = require("./routes/other");

//Config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(require('path').join(__dirname,'/public')));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Passport configuration
app.use(require("express-session")({
    secret: config.secretString,
    resave: false,
    saveUninitialized: false
}));

//Initializing Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use for cloud9
// process.env.DATABASEURL = "mongodb://localhost/wepoll";
// mongoose.connect(process.env.DATABASEURL);

//use for deploying to heroku
mongoose.connect(config.mongoString);


//clear and seed DB
seedDB();
//seed Users currently puts x! instead of x users in DB, be careful
// seedUsers(1);
// seedDBItems();
// seedDBparties();


//calls this function on every route, gets userInfo
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.checkLevel = middleware.checkLevel;
    res.locals.levelProgress = middleware.levelProgress;
    next();
});

//Using Routes
app.use("/", indexRoutes);
app.use("/questions", questionsRoutes);
app.use("/", otherRoutes);

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("WePoll Server started!");
});

