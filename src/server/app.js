'use strict';
var express = require('express');
var path = require('path');
var url = require('url');
var jwt    = require('jsonwebtoken');
var bodyParser  = require('body-parser');
var morgan = require('morgan');

var pwd = require('./pass')
var db = require('./db');
var config = require('./config');

// -------- my proxy----------------------
var app = express();
app.set('port', process.env.PORT || 8080);
app.set('superSecret', config.secret);
app.use(function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }
);
app.use(express.static(path.join(__dirname, '../../public')));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


function authenticate(name, pass, callback) {
  db.User.findOne ({username: name}, function(err, user) {
    if (!user) return callback(new Error('cannot find user'));
    pwd.hash(pass, user.salt, function(err, hash){
      if (err) return callback(err);
      if (hash == user.hash) return callback(null, user);
      callback(new Error('invalid password'));
    })
  })
}

app.listen(app.get('port'));

var apiRoutes = express.Router(); 

apiRoutes.post('/authenticate', function(req, res) {
	 authenticate(req.body.username, req.body.password, function(error, user){
	 	console.log(user);
	 	console.log(error);
    if (error) {
    	res.status(422).json({"errors": [error.message], status: "error"});
    }
    else {
    	var token = jwt.sign(user, app.get('superSecret'), {
        expiresIn: 86400 // expires in 24 hours
     	});
     // return the information including token as JSON
      console.log(user)
      res.set({
			  'access-token': token,
			  'expiry': '86400',
			  'uid': user.email,
			  'client': 'web'
			})
     	res.json({
     		"data": {
				  "uid": user.email,
				  "provider": "email",
				  "email": user.email,
				  "favorite_color": null,
				  "id": user.id
				}
      });
    }
  });
});

apiRoutes.delete('/logout', function(req, res) {
	res.json({ success: true });
})

apiRoutes.post('/registration', function(req, res) {
  if(req.body.password != req.body.password_confirmation){
    res.status(422).json({"errors": {password_confirmation: ["doesn't match Password"],}, status: "error"});
  }
  db.User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (user) {
      res.status(422).json({"errors": {email: ["User already exists"]}, status: "error"});
    } else {

      var newUser = new db.User();
          // set the user's local credentials
      newUser.email = req.body.email;
			pwd.hash(req.body.password, function(err, salt, hash) {
			  if (err) {
			    console.log(err);
			  }
			  newUser.salt = salt;
			  newUser.hash = hash;
			  newUser.save(function(err, justCreatedUser) {
			    if (err) {
			      console.log(err);
			    } else {
            console.log(justCreatedUser);
			      console.log("user saved");
			      var token = jwt.sign(newUser, app.get('superSecret'), {
          		expiresIn: 1440*60 // expires in 24 hours
        		});
        		
            res.set({
              'access-token': token,
              'expiry': '86400',
              'uid': newUser.email,
              'client': 'web'
            })
            res.json({
              "data": {
                "uid": newUser.email,
                "provider": "email",
                "email": newUser.email,
                "favorite_color": null,
                "id": newUser._id
              }
            });
			    }
			  });
			});
		}
 });
});

apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  db.User.find({}, function(err, users) {
    res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);