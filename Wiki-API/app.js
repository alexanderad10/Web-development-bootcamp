const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/wikiDB');
  console.log("Connected");

  const articleSchema = new mongoose.Schema({
    title: String,
    content: String
  });

  const Article = mongoose.model('article', articleSchema);

  app.route("/articles")

    .get(function(req, res){
        Article.find({})
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
    })

    .post(function(req, res){
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save();    
    })

    .delete(function(req, res){
        Article.deleteMany({})
        .then(result => {
            res.send("Deleted");
        })
        .catch(err => {
            res.send(err);
        })
    });


//specific target

app.route("/articles/:articleTitle")
    .get(function(req, res){
        Article.findOne({title: req.params.articleTitle})
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
    })

    .put(function(req, res){
        Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content})
            
        .then(result => {
            res.send("Article updated");
        })
        .catch(err => {
            console.log(err);
        })
    })

    .patch(function(req, res){
        try {
            Article.updateOne(
              { title: req.params.articleTitle },
              { $set: req.body }
            ).then(function () {
              res.send("Successfully updated article");
            });
          } catch (err) {
            res.send(err);
          }
    })

    .delete(function(req, res){
        Article.deleteOne({title: req.params.articleTitle})
        .then(result => {
            res.send("Deleted");
        })
        .catch(err => {
            res.send(err);
        })
    });




  app.listen(3000, function() {
        console.log("Server started on port 3000");
  });
}

