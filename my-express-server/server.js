const express = require("express");
const app = express();


app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.get('/contact', function(req, res) {
    res.send('Contact me!')
});

app.get('/about', function(req, res) {
    res.send('<h1>My name is Alexander Adler and I am a computer science student!</h1>')
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});

