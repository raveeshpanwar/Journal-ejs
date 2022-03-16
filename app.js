//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Made by Raveesh,Built using Ejs template,mongodb. This App allows saving entries of different kind";
const contactContent = "Raveeshpanwar333@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose=require('mongoose');
const Post=require("./schema");
mongoose.connect('mongodb+srv://admin_raveesh:0NEPLUS_3T@cluster0.rinkz.mongodb.net/journalDB')
const _=require('lodash');
const posts=[];
let userPosts;

app.get('/',function(req,res){
  Post.find({},function(err,posts){
    res.render('home',{posts:posts});
  })

})

app.get('/posts/:postId',function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      heading: post.title,
 
      bodyText: post.poste
 
    });
 
  });
 
 
  })


  app.get('/about',function(req,res){
  res.render('about',{p2:aboutContent});
  })
  
  app.get('/contact',function(req,res){
    res.render('contact',{p3:contactContent});
    })

  app.get('/compose',function(req,res){
    res.render('compose',{});
  })


  app.post('/compose',function(req,res){
    let composeTitle=_(req.body.composetitle);
    let composePost=req.body.contentpost;
    const composeData=new Post({
      title:composeTitle,
      poste:composePost
    });
      composeData.save();
res.redirect('/');
    posts.push(composeData);
    return posts;
  })
  //https://sleepy-garden-33924.herokuapp.com/
    











  let port=process.env.PORT;
  if(port==null||port==""){
    port=3000;
  }
  app.listen(port,function() {
    console.log("Server started");
  });
  
