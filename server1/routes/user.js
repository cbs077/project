const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middleware/auth');
const authMiddleware = require('../middleware/auth');

module.exports = function(app, User)
{
	// GET ALL BOOKS
/*    app.get('/api/books', function(req,res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });
*/
	app.get('/', function(req,res){
		res.send('Hello World12');
    });

	app.get('/test', function(req,res){
		 var user = new User();
		    console.log( req.body );
		    user.username = "test";
		    user.password = "test"
		    	
		    user.save(function(err){
		        if(err){
		            console.error(err);
		            res.json({result: 0});
		            return;
		        }
		
		        res.json({result: 1});
		
		    });

    });

     // 가입
	app.post('/api/user', function(req, res){
	    var user = new User();
	    console.log( req.body );
	    user.username = req.body.username;
	    user.password = req.body.password;        
	    user.firstName = req.body.firstName;
	    user.lastName = req.body.lastName;
	    // 사용자 중복 확인 추가 예정

	    user.save(function(err){
	        if(err){
	            console.error(err);
	            res.json({result: 0});
	            return;
	        }
	
	        res.json({result: 1});
	
	    });
	}); 
/*	
	app.post("/login", function(req, res) {
		  if(req.body.name && req.body.password){
		    var name = req.body.name;
		    var password = req.body.password;
		  }
		  // usually this would be a database call:
		  var user = users[_.findIndex(users, {name: name})];
		  if( ! user ){
		    res.status(401).json({message:"no such user found"});
		  }

		  if(user.password === req.body.password) {
		    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		    var payload = {id: user.id};
		    var token = jwt.sign(payload, jwtOptions.secretOrKey);
		    res.json({message: "ok", token: token});
		  } else {
		    res.status(401).json({message:"passwords did not match"});
		  }
	 });
*/	 

	app.post('/login', function(req, res) {
        /*
         * Check if the username and password is correct
         */
        if( req.body.username === 'admin' && req.body.password === 'admin' ) {
            res.json({
                id: 1,
                username: 'admin',
                jwt: jwt.sign({
                    id: 1,
                }, config.JWT_SECRET, { expiresIn: 60*60 })
            });
        } else {
            /*
             * If the username or password was wrong, return 401 ( Unauthorized )
             * status code and JSON error message
             */
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }
    });  
	app.post('/signup', (req, res) => {
		  const { userid, password } = req.body;

		  User.findOneByUserid(userid)
		    .then(user => {
		      if (user) {
		        throw new Error(`${userid}는 이미 사용중입니다.`);
		      } else {
		        return User.create(userid, password);
		      }
		    })
		    .then(() => res.json({ success: true }))
		    .catch(err => res.status(409).json({ success: false, message: err.message }));
	});
	/*
	  signin
	  POST /auth/signin
	  { userid, password }
	*/
	//수정필요 get으로 변환
    
	app.post('/api/authen35' , function(req, res){
    	console.log("auth" , req.body);
   // 	var user = new User();
    	User.findOne({username: req.body.username}, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'book not found'});
            
        //    console.log("auth", user );
	        res.json(user);
        });
    	
    });
    
	app.post('/user/authen', (req, res) => {
	  const { userid, password } = req.body;

	  // userid에 의한 user 검색
	 /*  User.findOneByUserid(userid)
	    .then(user => {
	      // user 미존재: 회원 미가입 사용자
	      if (!user) { throw new Error('가입하지 않은 아이디입니다.'); }

	      // 패스워드 체크
	      if (!user.verify(password)) { throw new Error('패스워드가 일치하지 않습니다.'); }

	      // userid가 존재하고 패스워드가 일치하면 토큰 발행
	      return createToken({
	        userid: user.userid,
	     //   admin: user.admin
	      });
	    })*/
	    User.findOne({username: req.body.username}).
	    then(user => {
	    	console.log( "user:", user );
	    	//if(err) return res.status(500).json({error: err});
            //if(!user) return res.status(404).json({error: 'book not found'});
            return createToken({
    	        userid: user.username
            });
            
        //    console.log("auth", user );
	    //    res.json(user);
        })
	    .then(token => res.json({sucess: true, token }))
	    .catch(err => res.status(403).json({ sucess: false, message: err.message }));
	});

	/*
	  header의 Authorization에 JWT 값을 설정하여 서버로 전송하면 서버는 token을 검증한 후 현재 계정의 상태를 response한다.
	  GET /auth/check
	  JWT Token
	*/
	/*
	app.get('/check', isAuthenticated, (req, res) => {
	  res.json(req.decodedToken);
	});
	*/
	//app.use('/check', authMiddleware)

}
