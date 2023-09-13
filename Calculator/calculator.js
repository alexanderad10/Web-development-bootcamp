const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
    var num1 = req.body.num1;
    var num2 = req.body.num2;

    var result = Number(num1) + Number(num2);
    res.send("Result: " + result);
});

app.get('/bmiCalculator', function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/bmiCalculator', function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var result = weight / Math.pow(height, 2);
    res.send("Result: " + result);
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});