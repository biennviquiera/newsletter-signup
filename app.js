const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
const port = 3000;

//For hiding API key
require('dotenv').config()


//middleware
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    "members": [
      {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  console.log("data: " + JSON.stringify(data));

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/" + process.env.AUDIENCE_ID;
  const options = {
    method: "POST",
    auth: "user:" + process.env.API_KEY
  }

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end;
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
})
