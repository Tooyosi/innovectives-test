const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const IP = '127.0.0.1';
const routes = require('./routes/index.js');
// require('dotenv').config();
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
);

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(routes);

app.listen(PORT, IP, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
