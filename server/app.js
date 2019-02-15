var express                 = require("express"),
    bodyParser              = require("body-parser"),
    cookieParser            = require("cookie-parser"),
    app                     = express(),
    PORT                    =  3000,
    IP                      = "127.0.0.1",
    routes                  = require("./routes/index.js");
    // require('dotenv').config();
    app.use(cookieParser());

var cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



app.use(routes)


app.listen(PORT, IP, () => {
    console.log(`Server is listening on ${PORT}`)
})

module.exports = app;