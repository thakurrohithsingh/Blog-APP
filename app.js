  var express = require("express");
  var app = express();
  var mongoose = require("mongoose");
  var expressSanitizer = require("express-sanitizer");
  var bodyparser = require("body-parser");
  var methodoveride = require("method-override");
  app.use(bodyparser.urlencoded({extended:true}));
  app.use(expressSanitizer());
  //mongoose.connect("mongodb+srv://rohithsingh:geethasingh@10@cluster0-vciis.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
  mongoose.connect("mongodb://localhost:27017/blogs", { useNewUrlParser: true });
  app.set("view engine","ejs");
  app.use(express.static("public"));
  app.use(methodoveride("_method"));
  var blogsSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date,default:Date.now}
  });
  var Blogs = mongoose.model("Blogs",blogsSchema);

  app.get("/",function(req,res){
  	res.redirect("/blogs");
  });
  app.get("/blogs",function(req,res){
  Blogs.find({},function(err,allblogs){
            if(err){
              console.log(err);
            }
            else{
                res.render("index" ,{blogs:allblogs});
            }
  });
  });
  app.get("/blogs/new",function(req,res){
            res.render("new");
  });

  app.post("/blogs",function(req,res){
       var title = req.body.newblog;
       var image = req.body.image;
       req.body.description = req.sanitize(req.body.description);
       var desc = req.body.description;
       var blog = {title:title, image:image, body:desc};
       Blogs.create(blog,function(err,createdblog){
              if(err){
                console.log(err);
              }
              else{
                res.redirect("/blogs");
              }
       });
  });

  app.get("/blogs/:id",function(req,res){
    var id = req.params.id;
   Blogs.findById(id,function(err,idblog){
                 if(err){
                  console.log(err);
                 }
                 else{
                       res.render("show",{ blogs:idblog});
                 }
   });
  });
  
  app.get("/blogs/:id/edit",function(req,res){
    var id1 = req.params.id;
    Blogs.findById(id1,function(err,editid){
      if(err){
        console.log(err);
      }
      else{
             res.render("edit",{blogs:editid});
      }
    });
  });

app.put("/blogs/:id",function(req,res){
        var id2 = req.params.id;
        var title = req.body.title;
        var image = req.body.image;
        req.body.description = req.sanitize(req.body.description);
        var desc = req.body.description;
        var blog1  = {title:title, image:image, body:desc};
        Blogs.findByIdAndUpdate(id2,blog1,function(err,updateblog){
                if(err){
                  console.log(err);
                }
                else{
                  res.redirect("/blogs/" + id2);
                }
        });
});

 app.delete("/blogs/:id",function(req,res){
   var id3 = req.params.id;
   Blogs.findByIdAndRemove(id3,function(err){
        if(err){
          console.log(err);
        }
        else{
          res.redirect("/blogs");
        }
   });
 });

  app.listen(80,function(){
  	console.log("server has started at port 80");
  });

































  /*app.get("/results/:results",function(req,res){
      var query = req.query.search;
      console.log(req.query);
      //var url= "http://www.omdbapi.com/?s=" + query + "&apikey=a8e3c94f";
      var url = "http://www.omdbapi.com/?s=" + query + "&apikey=a8e3c94f";
      request(url,function(error,response,body){
          var data = JSON.parse(body);
          res.render("result",{data:data});
      });
  });
  app.get("/search/:search",function(req,res){
         res.render("search");
  });
  app.post("/additem/item",function(req,res){
    var body = req.body.item;
      friends = body;
    res.redirect("/item");
  });*/