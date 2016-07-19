var db = require('./db');
var pwd = require('./pass');
var user = new db.User();
user.username = "username";
pwd.hash("password", function(err, salt, hash) {
  if (err) {
    console.log(err);
  }
  user.salt = salt;
  user.hash = hash;
  user.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("user saved");
    }
  });
});