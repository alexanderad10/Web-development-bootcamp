const bodyParser = require("body-parser");
const express = require("express");

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    let today = new Date();
   /*  var currentDay = today.getDay();
    var day = "";
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    if(currentDay === 6 || currentDay === 0){
        day = "weekend";
    } else{
        day = "weekday";
    }
 */
    let options = {
        weekday: "long",
        day: 'numeric',
        month: 'long'
    }
    let day = today.toLocaleDateString('en-US', options);
    res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    //console.log(item);

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running in port 3000.");
});