 var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
 var nunjucks = require('nunjucks'); 
 var session = require('express-session'); 
 var connect = require('connect'); 
var mongoose = require('mongoose');

var colors=require('colors');
var MongoClient = require('mongodb').MongoClient;

var moment= require('moment');



//var passport = require('passport')
 // , LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup

app.set('view engine', 'html');





nunjucks.configure('views', {
    
    express: app,
    watch:true
});

colors.setTheme({
  custom: ['black', 'underline','bgWhite']
});





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public/images', 'taxi.tiff')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', 
  saveUninitialized: true,
 resave:true

 }));
//  app.use(passport.initialize());
 // app.use(passport.session());






MongoClient.connect('mongodb://localhost:27017/one', function(err, db) {



app.get('/',function(req,res){

var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

if(!req.session.user){
                             // cannot access session here

                        res.render('home',{'title':'IIIT D&M TaxiPort'});
                        console.log((ip+ " is at home page").custom);


}

else{
 db.collection('taxi').find({"username":req.session.user},{_id:0}).toArray(function(err,docs){




                                    db.collection('ride').find({},{"_id":0}).toArray(function(err,docs){





                                            // res.send(count1);
  
                                           res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'items':docs});

                                               
                                                  

                                       });

                         

                  });

}

});



app.get('/logout',function(req,res){

req.session.destroy();

res.redirect('/');



});


app.post('/pwd',function(req,res,done){
var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;


        console.log((ip+ " is entering password").custom);

         var user = req.body.username;



         var user_secure = user.replace(/[^a-zA-Z1-9]/g,"");


         req.session.user = user_secure;


                if(user_secure!=""){

                    db.collection('taxi').find({"username":user_secure},{_id:0}).toArray(function(err,docs){

  

                        var count= docs.length;



                              if(count==1){
   

                                 res.render('pwd',{'title':'IIIT D&M TaxiPort','user_secure':user_secure, 'content1':"", 'content2':""});
  
                                            }



                              else{

                                  res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"No Such User Found", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});
                                    console.log((ip+ " has enterd an invalid user").custom);

                                        } 


                    });

                }

                else{

                  res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"Plese enter a username ", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});

                  console.log((ip+ " has entered an empty username").custom);


                    }


});


app.get('/show',function(req,res,done){

  var ip = req.headers['x-forwarded-for'] || 
                                 req.connection.remoteAddress || 
                                  req.socket.remoteAddress ||
                                  req.connection.socket.remoteAddress;
  

  console.log((ip+ "accessed main portal via new ride page").custom);


            if(req.session.user!=""){

                        db.collection('taxi').find({"username":req.session.user},{_id:0}).toArray(function(err,docs){




                                    db.collection('ride').find({},{"_id":0}).toArray(function(err,docs){





                                            // res.send(count1);
  
                                           res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'items':docs});

                                               
                                                  

                                       });

                         

                  });
         }

  else{
    res.send("Shit happened");
  }





});

app.post('/show',function(req,res,done){

                        var ip = req.headers['x-forwarded-for'] || 
                                 req.connection.remoteAddress || 
                                  req.socket.remoteAddress ||
                                  req.connection.socket.remoteAddress;

                          console.log((ip+ "accessed main portal").custom);

                        var pass = req.body.password;


                        var pass_secure = pass.replace(/[^a-zA-Z1-9]/g,"");

            if(pass_secure!=""){

                        db.collection('taxi').find({"username":req.session.user},{_id:0}).toArray(function(err,docs){



                           var count= docs.length;



                         if(pass_secure== docs[0].password){

                          req.session.authenticated = true;
   

                                     var date = moment();

     

                                    db.collection('ride').find({},{"_id":0}).toArray(function(err,docs){





                                // res.send(count1);
  
                                  res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'items':docs});

                                                  
                                                });

          
                                                       
                                   }



                           else{
                             
                              res.render('pwd',{'user_secure':req.session.user,'title':"IIIT TaxiPort", 'content1':"The entered password is incorrect", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});


                               console.log((ip+ " has entered incorrect password").custom);

                             

                               }

                   });
                

            }


            else{


                  res.render('pwd',{'user_secure':req.session.user,'title':"IIIT TaxiPort", 'content1':"Please enter a password", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});
 
                   console.log((ip+ " has entered a empty password").custom);

                }




});

app.post('/signup',function(req,res,done){

var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

console.log((ip + " is signing up").custom);

var pass_sign = req.body.password_sign;

var re_pass_sign = req.body.re_password_sign;

var user_sign = req.body.username_sign;


var pass_secure = pass_sign.replace(/[^a-zA-Z1-9]/g,"");

var re_pass_secure = re_pass_sign.replace(/[^a-zA-Z1-9]/g,"");

var user_sign_secure = user_sign.replace(/[^a-zA-Z1-9]/g,"");


req.session.user_sign = user_sign_secure;

req.session.pass_sign = pass_secure;


req.session.re_pass_sign = re_pass_secure;


if(pass_secure!="" && re_pass_secure!=""){

if(pass_secure==re_pass_secure)
{


db.collection('taxi').find({"username":req.session.user_sign},{_id:0}).toArray(function(err,docs){


var count = docs.length;


if(count==0){



db.collection('taxi').insertOne({"username":req.session.user_sign, "password":pass_secure});

res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"You have been successfully registered", 'content2':"Please login below"});

console.log((ip+ " is regesitered").custom);

//res.render('return_home',{'title':'IIIT DM Taxi portal'});
}

else{

res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"This usename already exists ", 'content2':"Please login with existing account"});

console.log((ip+ " is trying to sign up again using same username").custom);

}

});

}

else{

res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"The entered passwords donot match", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});

console.log((ip+ " has entered non-matching passwords").custom);

}
}
else{ 

  res.render('return_home',{'title':"IIIT TaxiPort", 'content1':"You cannot leave password field empty", 'content2':"Note: Characters other than a-z A-Z 1-9 are not allowed "});

  console.log((ip+ " has entered empty password at signup").custom);

}



res.end;

});


app.get("/test", function(req,res){

res.render("create_ride",{'user':req.session.user , 'title':"IIIT DM TaxiPort"});


});



app.post("/added",function(req,res){


var start = (req.body.start).replace(/[^a-zA-Z1-9]/g,"");;
var end = (req.body.end).replace(/[^a-zA-Z1-9]/g,"");;
var date_d = (req.body.date_d).replace(/[^a-zA-Z1-9]/g,"");;
var date_m = (req.body.date_m).replace(/[^a-zA-Z1-9]/g,"");;
var date_y = (req.body.date_y).replace(/[^a-zA-Z1-9]/g,"");;

var time_h = (req.body.time_h).replace(/[^a-zA-Z1-9]/g,"");;
var time_m = (req.body.time_m).replace(/[^a-zA-Z1-9]/g,"");;

var time_ap = req.body.a_p;


var user= req.session.user;



db.collection('ride').insertOne({'start':start,'end':end,'date_d':date_d,'date_m':date_m,'date_y':date_y,'time_h':time_h,'time_m':time_m,'user':user,'time_ap':time_ap});

      res.redirect('/show');


});


app.get("/dashboard",function(req,res){


var user= req.session.user;


db.collection('ride').find({"username":user},{_id:0}).toArray(function(err,docs){

res.render('dashboard',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'items':docs});


});

});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000,function(){
  console.log("started at 3000".custom);
  console.log("Hello ".custom);
});


});

module.exports = app;

