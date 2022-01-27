//jshint esversion:6

const express = require("express");
//const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash")
const mongoose=require("mongoose") 



const aboutContent = "This web app has been built by me: Aryan Sawkar to keep a track of my completed tasks as a part of my final year project";

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {

  title: String,
 
  content: String
 
 };

 const Post = mongoose.model("Post", postSchema);




app.get("/",function(req,res){
  Post.find({}, function(err, posts){

    res.render("home", {
 
      
 
      posts: posts
 
      });
 
  })

})

app.get("/about",function(req,res){
res.render("about",{ABOUTContent: aboutContent})
})

app.get("/contact",function(req,res){
res.render("contact",{CONTACTContent: contactContent})
})

app.get("/compose",function(req,res){
  res.render("compose")
})

app.post("/compose",function(req,res){
  const post = new Post ({

    title: req.body.post_title,
 
    content: req.body.post_body
 
  });
  
  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });

})

app.get("/posts/:postName",function(req,res){

  const requestedTitle=_.lowerCase(req.params.postName)
  posts.forEach(function(post){

   const storedTitle=_.lowerCase(post.title)
   if (storedTitle === requestedTitle){
    res.render("post",
    {
      title:post.title,
      content:post.content
    }
    )
   }


  })
})
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
