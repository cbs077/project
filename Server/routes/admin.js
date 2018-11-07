const router = require('express').Router();
const Category = require('../models/category');
const User = require('../models/user');
const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middleware/auth');

// CREATE BOOK
router.post('/category', function(req, res){
    var category = new Category();
    category.category = req.body.category;
 //   category.published_date = new Date(req.body.published_date);

    category.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});
router.get('/category' ,  function(req,res){
	
	    Category.find(function(err, category){
        if(err) return res.status(500).send({error: 'database failure'});
        console.log('category1', category);
        res.json(category);
    })
});
module.exports = router;