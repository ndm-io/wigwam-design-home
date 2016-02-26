var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var ObjectId = require('mongoose').Types.ObjectId; 
var User = require('../models/User');
var ProjectModels = require('../models/Project');
var Project = ProjectModels.model('Project');

var secrets = require('./secrets');
var CONSTS = require('../config/constants');

String.prototype.toObjectId = function() {
  return new ObjectId(this.toString());
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Sign in using Email and Password.

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (!user) return done(null, false, { message: 'Email ' + email + ' not found'});
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));



// Login Required middleware.

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
};


// Authorization Required middleware.

exports.isPrivileged = function(req, res, next) {
	if (!req.user) { res.sendStatus(401); return; }
	if (req.user.hasRole(req.role)) {
		return next();
	} else {
		res.sendStatus(401);
	}
};

// Checks a user is logged in and then determines if data can be sent to that user

exports.attachProject = function(req, res, next) {
	if (!req.user) { res.sendStatus(401); return; }
	
	var id = req.params.projectId;
	var guid = req.body.projectGuid;
	
	var query;
	if (id) {
		var re = /^([a-zA-Z0-9]*-[a-zA-Z0-9]*)+/;
		var guidM = id.match(re);
		if (guidM) {
			query = {guid:id};
		} else {
			query = {_id:id.toObjectId()};
		}
	} else if (guid) {
		query = { guid:guid };
	} else {
		res.sendStatus(400); return;
	}
	
	Project.findOne(query)
		.populate('clients', '-password')
		.deepPopulate(Project.deepPopProps())
		.exec(function (err, project) {
			if (req.user.hasRole(CONSTS.ROLES.editor)) {
				req.project = project;
				return next();
			} else {
				if (!project) {
					res.sendStatus(404);
					return;
				}
		
				project.hasClient(req.user.id, function(success) {
					if (success) {
						req.project = project;
						return next();
					} else {
						res.sendStatus(401);
					}
				});
			}
		}
	);
	
};
