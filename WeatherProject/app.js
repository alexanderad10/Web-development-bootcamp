const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   
    const appKey = "452c98f2c9b501728335ff4ef1cc4ee9";
    const query = req.body.cityName;
    const unit = "metric";

    https.get('https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appKey + '&units=' + unit, (response) => {
        
        console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);

        response.on('data', (d) => {
            //process.stdout.write(d);
            //console.log(JSON.parse(d));
            const icon = JSON.parse(d).weather[0].icon;
            const imageURL = "https://api.openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>" + JSON.parse(d).weather[0].description + "<h1/>");
            res.write("<h1>" + JSON.parse(d).main.temp + "<h1/>");
            res.write("<img src="+imageURL+">");
            res.send();

        });

    })

})

app.listen(3000, function(){
    console.log("Server is running in port 3000.");
});