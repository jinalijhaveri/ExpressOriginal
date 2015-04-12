
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var session = require('express-session');

var index = require('./routes/index');
var profile = require('./routes/profile');
var user = require('./routes/users');
var jobapp = require('./routes/jobapplication');

var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({secret:'secre session',resave:true,saveUninitialized:true}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '\public')));
app.use(express.multipart());


app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));


app.get('/',index.login);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/users', user.list);

app.post('/signUp',user.signUp);
app.post('/signIn',user.signIn);
app.get('/getUserFromSession',user.getUserFromSession);
app.post('/checkForExistingUser',user.IsUserPresent);
app.get('/searchuser/:str', user.searchUsers);


app.post('/bio/:userid',profile.insertBio);
app.post('/certification/:userid',profile.insertCertification);
app.post('/skill/:userid',profile.insertSkill);
app.post('/college/:userid',profile.insertCollege);
app.post('/status/:userid',profile.insertStatus);
app.post('/company_followed/:userid',profile.insertCompanyFollowed);
//app.post('/user_followed/:userid',profile.insertUserFollowed);
app.post('/user_followed',profile.insertUserFollowed);
app.post('/posts',profile.insertPost);

app.get('/portfolio',profile.getPortfolio); //portfolio page
app.get('/profile/:userid',profile.getProfile); //profile data

app.get('/userprofile',profile.getUserProfile); //profile page

app.post('/application', jobapp.postJobApplication);
app.get('/userapplication/:userId', jobapp.getJobApplication);
app.post('/updatejobstatus/:jobId/:userId', jobapp.updateJobStatus);
app.get('/getName/:userId', user.getName);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
