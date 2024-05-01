//This sets up the express app to run and allows access to its methods and objects
let express = require('express');
let app = express();


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


//this function works in conjunction with the previous app.get()
//it allows you to access standard files like .css or .js
app.use('/public', express.static(__dirname + '/public'))

































 module.exports = app;
