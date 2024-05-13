//This sets up the express app to run and allows access to its methods and objects
let express = require('express');
let app = express();

let dotEnv = require('dotenv').config();
let bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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

app.get("/", function(req, res) {
    res.send("Hello Express");
})


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
//This is an example of chain middleware. It is a time server 
//the first middleware example requests the time...
//...using the Date() and converts it with toString()...
//...the second middleware function responds with the time
app.get('/now', function(req, res, next) {
    req.time = new Date().toString(); 
    next();
}, function(req, res) {
    res.send({time: req.time})
}
);

//this is using a route parameter in the PATH and the HANDLER...
//requests an echo word and responds with a JSON word
app.get('/:word/echo', function(req, res){
    // let echoStr = req.params.word;
    res.json({echo: `${req.params.word}`});
  })

//this is a query parameter input function
//it encodes the query using '?', is paired in...
//...'field=value' couples formate. The couples...
//...are seperated with a '&'.

app.get('/name', function(req, res){
    let fName = req.query.first;
    let lName = req.query.last;
    res.json({name: `${fName} ${lName}`})
  })
  
app.post('/name', function(req, res){
    let fName = req.body.first;
    let lName = req.body.last;
    res.json({name: `${fName} ${lName}`})
})
 































 module.exports = app;
