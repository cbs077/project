const router = require('express').Router();
const Keyword = require('../models/keyword');
const Board = require('../models/board');
const Category = require('../models/category');

router.get('/keyword', function(req, res){
	var keyword = req.query.keyword;
	console.log( 'keyword', keyword )
	
    Keyword.find({ "keyword": keyword }, function(err, result){
    	console.log( 'keyword1', result )
        if(err) return res.status(500).json({error: err});
        res.json(result);
    })
});
/*
router.get('/translate', function(req, res){
	var title = req.query.title;
	
	var request = require("request");
	var options = { method: 'GET',
	  url: 'https://valued-visitor-245301.appspot.com/getCategory?',
	  qs: { title: title },
	  headers: 
	   { 'Postman-Token': 'a21e58b4-7e76-41f9-bdcc-99e5ff63cc7a',
	     'cache-control': 'no-cache' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	  res.json( body );
	});
});
*/
module.exports = router;