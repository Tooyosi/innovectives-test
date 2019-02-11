var express                 = require("express"),
    bodyParser              = require("body-parser");
    jwt                     = require("jsonwebtoken"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express(),
    PORT                    =  3000,
    IP                      = "127.0.0.1";
    // require('dotenv').config();

let config = require("./config");
let middleware = require('./middleware');
var cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use(require("express-session")({
    secret: "file-uploader",
    resave: false,
    saveUninitialized: false
}))


mongoose.connect("mongodb://localhost:27017/file_uploader")

// schema setup
var UserSchema = new mongoose.Schema({
    name: String,
    password: String 
});
UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema)

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.send("The root route")
})
app.post("/signup", (req, res) =>{
    console.log(req.body)
    var newUser = new User({
        username: req.body.name
    })

    User.register(newUser, req.body.password, (err, newUser) => {
        if(err){
            return res.status(400).json({
                error: "Not signed up"
            })
        }
            passport.authenticate("local")(req, res, (data) => {
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully signed up! Now you should be able to log in.'
                  });
            })

    })
} )
app.post("/login", passport.authenticate("local", {

}),(req, res) => {
    console.log(req.body.name)
    var obj = { name: 'lkk', password: 'lkk' };
    console.log(obj.name)
    if(req.body.name == obj.name){
         res.json(req.body);
    } else{
        return res.json({
            error: "wrong details"
        })
         res.json(req.body);
    }
    // res.send("done!!!")
    // res.redirect("http://localhost:8080/")
})

class HandlerGenerator {
    login (req, res) {
        let username = req.body.name;
        let password = req.body.password;

        // For the given username fetch user from db
        let mockedUsername = 'admin';
        let mockedPassword =  'password';

        if(username && password){
            if (username == mockedUsername && password == mockedPassword) {
                let token = jwt.sign({username: username},
                    config.secret,
                    { 
                        expiresIn: '24h' // exires in 24hrs
                    }
                    );
                    // return the jwt token for the future API calls
                    res.status(200).send({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'Authentication failed, please check the request'
            });
        }
    }
    index (req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}

let handlers = new HandlerGenerator();


app.post("/testLogin", handlers.login);
app.get("/test", middleware.checkToken, handlers.index)

  
app.listen(PORT, IP, () => {
    console.log(`Server is listening on ${PORT}`)
})