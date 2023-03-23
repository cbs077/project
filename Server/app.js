// serverjs

// [LOAD PACKAGES]
var cors = require('cors');
var path = require('path');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

const router = require('express').Router()

const jwt = require('jsonwebtoken');
var config = require('./config.js');
const { isAuthenticated } = require('./middleware/auth');
//require('./middleware/sitemapMiddleware');
var autoIncrement = require('mongoose-auto-increment');

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
var connect = mongoose.connect('mongodb://admin:sage123@rankanswer.com/knowhow');

//var connect = mongoose.connect(mongodbatla);	
autoIncrement.initialize(connect);

//mongoose.connect('mongodb://localhost/mongodb_tutorial');
app.use(cors());

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


var User = require('./models/user');
var Admin = require('./routes/admin');
var Board = require('./routes/board');
var Service = require('./routes/service');
var info = require('./routes/info');
//var category = require('./routes/board');
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ limit : "200mb",extended: true }));
app.use(bodyParser.json({ limit : "200mb",extended: true }));
app.use(express.static('public'));
//app.use(express.json({ limit : "200mb", extended: true  }));
//app.use(express.urlencoded({ limit:"200mb", extended: true, parameterLimit: 1000000}));
app.use('/upload', express.static(path.join(__dirname, '/upload')));


console.log("__dirname", __dirname)
// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 3000 ;
// [CONFIGURE ROUTER]

require('./routes/user.js')(app, User);
app.use('/admin', Admin);
app.use('/api/board', Board);
app.use('/api/service', Service);
app.use('/api/info', info);

app.get('/sitemap.xml', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://example.com/' })
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    smStream.write({ url: '/page-1/',  changefreq: 'daily', priority: 0.3 })
    smStream.write({ url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/page-3/'})    // changefreq: 'weekly',  priority: 0.5
    smStream.write({ url: '/page-4/',   img: "http://urlTest.com" })
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
