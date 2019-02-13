var express     = require("express"),
    fs          = require("fs"),
    path        = require("path"),
    jwt         = require("jsonwebtoken"),
    expressjwt  = require("express-jwt")
    mime        = require("mime"),
    testFolder  = "../folder";

router = express.Router({mergeParams: true});

// join the path of the test folder to the workspace path
var newFolder = path.join(__dirname, testFolder)

const jwtCheck = expressjwt({
    secret: "fileupload"
})


router.get("/resource", (req, res) => {
    res
    .status(200)
    .send("You can see this")
})

router.get("/resource/secret", jwtCheck ,(req, res) => {
    res
    .status(200)
    .send("You should be logged in to see this")
})

router.get("/status", (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
    .status(200)
    .send(`Server time is ${localTime}.`)
})



const users = [
    {id: 1, username: "admin", password: "admin"},
    {id: 1, username: "guest", password: "guest"}
]

router.post("/login", (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    if(!username || !password){
        res
        .status(400)
        .send("You need ausername and Password");
        return;
    }    

    const user = users.find((u) => {
        return u.username === username && u.password === password
    })

    if(!user){
        res
        .status(401)
        .send("User not found");
        return;
    }

    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, "fileupload", { expiresIn: "3 hours"})
    res
    .status(200)
    .send({access_token: token})
})


router.get("/files",   (req, res) => {

    // innitiate an empty array that will contain the file properties
    var fileProperties = {}
    var fileArray = [];
    fs.readdir(newFolder, (err, files) =>{
        if(err){
            console.log(err)
            return res.status(400).send({
                success: false,
                message: 'File read failed, check the request'
            });
        }else{
            // creat an empty object for file properties
            // loop through each file
            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                var ext = path.extname(file);
                // assign properties and values to the object
                fileProperties = {
                    id: i,
                    extension: ext,
                    type: mime.getType(file),
                    name: path.basename(file, ext),
                    information: path.basename(file),
                    size: generateFileSize(file),
                    message: true
                }
                // check if the files are less than 10
                if(files.length < 10 ){
                    fileProperties.message = false;
                    
                    return res.status(200).send({
                        success: true,
                        message: fileArray
                    });
                    // res.render("folder", {file: files}) 
                    // console.log("Files in folder should be 10 or more");
                } else {
                    // check the file extension, return false if not csv or exel
                    if(fileProperties.extension != ".csv" &&  fileProperties.extension != ".xlsx") {

                        fileProperties.supported = false;
                    }
                    // check the file extension, return true if csv or exel                    
                    else if (fileProperties.extension == ".csv" || fileProperties.extension == ".xlsx"){
                         fileProperties.supported = true;
                    }
                }   
                
                // push the object into the file array
                fileArray.push(fileProperties)
            }
            // send the file array to the frontend
            // res.render("home", {file: fileArray})
           return res.status(200).send({
                success: true,
                message: fileArray
            });
        }
    })
    
})

var size = new Object()
// function to generate file size
function generateFileSize(param){
    var stats = fs.statSync(path.dirname(param))
        size = stats.size
        return (size)
}

router.get("*", (req, res) => {
    res.sendStatus(404)
})

module.exports = router;

