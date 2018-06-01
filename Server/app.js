// serverjs

// [LOAD PACKAGES]
var cors = require('cors');

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

const router = require('express').Router()

const jwt = require('jsonwebtoken');
var config = require('./config.js');
//const authMiddleware = require('./middleware/auth');
const { isAuthenticated } = require('./middleware/auth');


var autoIncrement = require('mongoose-auto-increment');

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
/*
var mongodbatla = 'mongodb://bschoi:bschoi1@cluster0-shard-00-00-0rwmm.mongodb.net:27017,' +
		'cluster0-shard-00-01-0rwmm.mongodb.net:27017,'  +
		'cluster0-shard-00-02-0rwmm.mongodb.net:27017/test?'+
        'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect( mongodbatla , function(err) {
    if (err) {
      console.error('mongodb connection error', err);
    }
    console.log('mongodb connected');
  });
*/  
var connect = mongoose.connect('mongodb://172.17.0.2:27017/abc1');

//var connect = mongoose.connect(mongodbatla);	
autoIncrement.initialize(connect);

//mongoose.connect('mongodb://localhost/mongodb_tutorial');
app.use(cors());
// DEFINE MODEL
//app.use(app.router);
//routes.initialize(app);

app.use(function(req, res, next) {
//	 res.header("Access-Control-Allow-Origin", "http://121.157.55.240:9999");
	 res.header("Access-Control-Allow-Origin",  "*");
	 res.header("Access-Control-Allow-Credentials", "true");
//	 res.header("Content-Type", "application/json");
//	 res.header("Access-Control-Allow-Headers", "X-Requested-With");
//	 res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); 
	 res.header("Access-Control-Allow-Headers", "mycode, Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	 res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	 res.header("Access-Control-Expose-Headers", "Authorization");
	 
	 next();
});

var Board = require('./models/board');
var User = require('./models/user');


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
//
// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]

require('./routes/board.js')(app, Board);
require('./routes/user.js')(app, User);
//app.use('/user', isAuthenticated, require('./routes/auth.js'));
//app.use('/api', isAuthenticated, require('./routes/board.js'));

//app.use('/api', require('./routes/auth'));

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});