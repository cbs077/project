const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middleware/auth');
const authMiddleware = require('../middleware/auth');

module.exports = function(app, User)
{

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
	
	    // 사용자 중복 확인 추가 예정
	    User.findOne({username: req.body.username})
	    .then(users => {
	      // user 미존재: 회원 미가입 사용자
	       console.log( "exist user:", user);
	       if (users) { 
	    	   throw new Error('이미 가입된 아이디입니다.');
	       }else{
	    	   console.log("make user");
	    	   user.username = req.body.username;
	    	   user.password = req.body.password; // encryto 예정       
	    	   user.firstName = req.body.firstName;
	    	   user.lastName = req.body.lastName;
	    	   user.save(function(err){
	   	        	if(err){
	   	        		console.error(err);
	   	        		res.json({result: 0});
	   	        		return 0;
	   	        	} 	
	   	        	return 0;	
	   	       });    	   
	       }
	    })
	    .then( result => res.json({sucess: true }))
	    .catch(err => res.status(403).json({ sucess: false, message: err.message }));
		
	}); // 로그인 확인
	app.post('/user/authen', (req, res) => {
        const { userid, password } = req.body;

	    console.log("req.body.password", req.body.password );
	    User.findOne({username: req.body.username}).
	    	then(user => {
		    	 if (!user) { throw new Error('가입하지 않은 아이디입니다.'); }
			      // 패스워드 체크
			     if (user.password != req.body.password ) { throw new Error('패스워드가 일치하지 않습니다.'); }
			      
	            return createToken({
	    	        userid: user.username
                });
            
        //    console.log("auth", user );
	    //    res.json(user);
        })
	    .then(token => res.json({sucess: true, token }))
	    .catch(err => res.status(403).json({ sucess: false, message: err.message }));
	});
}
