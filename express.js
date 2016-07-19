'use strict';
var express = require('express');
var path = require('path');
var url = require('url');


// -------- my proxy----------------------
var app = express();
app.set('port', process.env.PORT || 8080);
app.use(function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }
);
app.use(express.static(path.join(__dirname, 'public')));

function authenticate(name, pass, fn) {
  db.User.findOne ({username: name}, function(err, user) {
    if (!user) return fn(new Error('cannot find user'));
    hash(pass, user.salt, function(err, hash){
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
    })
  })
}

app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.regenerate(function(){
        req.session.user = user;
        res.redirect('back');
      });
    } else {
      res.redirect('login');
    }
  });
});

// middleware
function restrict(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

// route with restrict middleware
app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area');
});

app.listen(app.get('port'), function() {
    console.info('Express server started at http://localhost:' + app.get('port'));
});
