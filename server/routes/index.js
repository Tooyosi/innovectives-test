const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const mime = require('mime');

const testFolder = '../folder';

const router = express.Router({ mergeParams: true });

// join the path of the test folder to the workspace path
const newFolder = path.join(__dirname, testFolder);

// middleware to check token
const withAuth = function(req, res, next) {
  // check for token and save in a variable
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  // TODO: verify the token
  jwt.verify(token, 'fileupload', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized User',
      });
    }
    req.user = decoded;
    req.token = token;
    next();
  });

  // validate token
  // if(!token){
  //     res
  //     .status(401)
  //     .send("Unauthorized: Invalid Token");
  //     return;
  // }else{
  //     // do next thing
  //     next()
  // }
};

const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 1, username: 'guest', password: 'guest' },
];

router.post('/login', (req, res) => {
  const username = req.body.name;
  const { password } = req.body;
  // If theres no user input send a status code of 400
  if (!username || !password) {
    res.status(400).send('You need a username and Password');
    return;
  }

  // validate users
  const user = users.find(
    value => value.username === username && value.password === password
  );

  if (!user) {
    res.status(401).send('User not found');
    return;
  }
  // generate a token
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    'fileupload',
    { expiresIn: '3 hours' }
  );

  // save and pass token as cookie
  res.cookie('token', token, {
    // expiresIn: new Date() + 1000,
    maxAge: 50000, // 5 minutes
    httpOnly: true,
  });

  // send a status code of 200
  res.status(200).send({ access_token: token });
});

router.get('/files', withAuth, (req, res) => {
  // initiate an empty array that will contain the file properties
  let fileProperties = {};
  const fileArray = [];
  fs.readdir(newFolder, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
        message: 'File read failed, check the request',
      });
    }
    // creat an empty object for file properties
    // loop through each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = path.extname(file);
      // assign properties and values to the object
      fileProperties = {
        id: i,
        extension: ext,
        type: mime.getType(file),
        name: path.basename(file, ext),
        information: path.basename(file),
        size: generateFileSize(file),
        message: true,
      };
      // check if the files are less than 10
      if (files.length < 10) {
        fileProperties.message = false;

        return res.status(200).send({
          success: true,
          message: fileArray,
        });
        // res.render("folder", {file: files})
        // console.log("Files in folder should be 10 or more");
      }
      // check the file extension, return false if not csv or exel
      if (
        fileProperties.extension !== '.csv' &&
        fileProperties.extension !== '.xlsx'
      ) {
        fileProperties.supported = false;
      }
      // check the file extension, return true if csv or exel
      else if (
        fileProperties.extension === '.csv' ||
        fileProperties.extension === '.xlsx'
      ) {
        fileProperties.supported = true;
      }

      // push the object into the file array
      fileArray.push(fileProperties);
    }
    // send the file array to the frontend
    // res.render("home", {file: fileArray})
    return res.status(200).send({
      success: true,
      message: fileArray,
    });
  });
});

let size = new Object();
// function to generate file size
function generateFileSize(param) {
  const stats = fs.statSync(path.dirname(param));
  size = stats.size;
  return size;
}

// not found route
router.get('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
