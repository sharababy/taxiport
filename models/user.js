var mongoose = require('mongoose');
 

var sh = mongoose.Schema;

var user = new sh(

{
  username:String,
  passwird:String


});

module.exports = mongoose.model('User',user);

