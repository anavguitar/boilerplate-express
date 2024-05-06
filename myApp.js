//This sets up the express app to run and allows access to its methods and objects
let express = require('express');
let app = express();
require('dotenv').config();


//this is another example of middleware function
//it is placed at the top so that it logs at the...
//...beginning of the app. Notice the use of three
//...parameters: req, res, next. next() is the third argument...
//...that kicks in when the response is not sent. It essentially...
//...ends the function instead of haveing the server stuck in a loop.

app.get("/json", function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  })
  

//This logs "Hello World in the console"
console.log("Hello World!")


//This function uses the app.get() and res.send().
//app.get takes in 2 args: 1. a path, 2. a handler
//common handler is seen below
//also uses res.send() to send the string

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// })


//this function uses res.sendFile() and the __dirname
//res.sendFile() does exactly what it sounds like: it responds...
//...to a request and sends the file seen in the arg. It requires...
//...an absolute path
//__dirname is a Node global variabe that calculates...
//...the absololute path of a file.

app.get("/", function(req, res){
    res.sendFile(__dirname + '/views/index.html');
})


//this middleware function works in conjunction with the previous app.get()
//it allows you to access standard files like .css or .js
app.use('/public', express.static(__dirname + '/public'));

//this serves a simple API by using the "json" method
//it PUTS the the JSON obj/arg in the /json route
app.get("/json", function(req, res){
    if(process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});































 module.exports = app;
