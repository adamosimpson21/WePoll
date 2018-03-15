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
    Answer          = require("./models/answer"),
    seedDB          = require("./seeds");

//requiring routes
var questionsRoutes = require("./routes/questions"),
    indexRoutes     = require("./routes/index"),
    otherRoutes     = require("./routes/other");

//Config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Passport configuration
app.use(require("express-session")({
    secret: "Apple Pie High Five",
    resave: false,
    saveUninitialized: false
}));

//Initializing Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//start server
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://BandsWithLegends:GrapeJelly@ds113749.mlab.com:13749/wepoll")

//clear and seed DB
//seedDB();

//calls this function on every route, gets userInfo
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
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