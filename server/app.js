var express                 = require("express"),
    bodyParser              = require("body-parser");
    app                     = express(),
    fs                      = require("fs"),
    path                    = require("path"),
    mime                    = require("mime"),
    PORT                    =  3000,
    IP                      = "127.0.0.1",
    testFolder              = "./folder";
    // require('dotenv').config();


var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// join the path of the test folder to the workspace path
var newFolder = path.join(__dirname, testFolder)

app.get("/", (req, res) => {
    // innitiate an empty array that will contain the file properties
    var fileArray = [];
    fs.readdir(newFolder, (err, files) =>{
        if(err){
            console.log(err)
        }else{
            // creat an empty object for file properties
            var fileProperties = {}
            // loop through each file
            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                var ext = path.extname(file);
                // assign properties and values to the object
                fileProperties = {
                    extension: ext,
                    type: mime.getType(file),
                    name: path.basename(file, ext),
                    information: path.basename(file),
                    size: generateFileSize(file)
                }
                // push the object into the file array
                fileArray.push(fileProperties)
                // check if the files are less than 10
                if(files.length < 10 ){
                    res.render("folder", {file: files}) 
                    console.log("Files in folder should be 10 or more");
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
            }
            // send the file array to the frontend
            res.render("home", {file: fileArray})
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


  
app.listen(PORT, IP, () => {
    console.log(`Server is listening on ${PORT}`)
})