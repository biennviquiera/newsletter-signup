const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
  console.log(req.body.fName);
})

app.listen(port, () => {
  console.log("Server is running on port " + port);
})
