/*
Christopher Statton
Used Template posted in Canvas
9/30/22
CS 3203
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

//global variable for tweet data
var tweetinfo = []

//global variable for searched tweet data
var searchedTweet = []

//global variable for incrementing new users when creating new tweets
var userNum = 1;

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data

    tweetinfo = JSON.parse(fs.readFileSync('favs.json'));
  }
});

//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({searchedTweet: searchedTweet});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var newTweet = req.body.input;

  // used to check if user created tweet follows the naming rules (i.e. "ID;Text")
  var regex=/^[0-9]+$/;

  // used to check if a new tweet was created or if user inputted incorrect format
  var created = false;

  // if entered input follows naming rules, create new tweet
  if (newTweet.split(";")[0].match(regex))
  {
    tweetinfo.push({
      id: Number(newTweet.split(";")[0]),
      text: newTweet.split(";")[1],
      created_at: Date(),
      user: {
        name: "New User " + userNum,
        id: userNum,
        screen_name: "User" + userNum++
      }
    });
    created = true;
  }
  res.send(created);
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet

  var searchID = req.body.id;
  searchedTweet = tweetinfo.find(x => {return x.id == searchID});

  res.send('search successful');
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var name = req.body.name;
  var newName = req.body.newName;

  var found = false;

  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.user.name === name)
    {
      tweet.user.screen_name = newName;
      found = true;
    }
  })
  res.send(found);
});

//Delete 
app.delete('/tweetinfo/:id', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.id;
  var found = false;

  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.id === Number(id))
    {
      tweetinfo.splice(index,1);
      found = true;
    }
  });

  /*
  if (found === true)
  {
    res.send("deleted");
  }
  else
  {
    res.send("not found");
  }

   */
  res.send(found);
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});