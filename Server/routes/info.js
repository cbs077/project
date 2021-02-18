const router = require('express').Router();
const Object = require('../models/object');
const Category = require('../models/category_info');
//const Objecta = require('../models/objects');

// router.get('/user/category/:user_id' , /*isAuthenticated,*/  function(req,res){
//     var user_id = req.params.user_id

//     Category.find({userId: user_id}, function(err, object){
//         if(err) return res.status(500).send({error: 'database failure'});
//         console.log("object", object);
//         res.json(object);
//     })
// });

router.get('/category/:id' , /*isAuthenticated,*/  function(req,res){
    var id = req.params.id

    Category.find({userId: id}, function(err, object){
        if(err) return res.status(500).send({error: 'database failure'});
        console.log("object", object);
        res.json(object);
    })
});
router.post('/category/' , /*isAuthenticated,*/  function(req,res){
    var object = new Category();

    object.id = req.body.id;
    object.userId = req.body.userId;
    object.name = req.body.name;
    object.fieldList = req.body.fieldList;

    object.save(object, function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

router.get('/object/:category_id' , /*isAuthenticated,*/  function(req,res){
    var category_id = req.params.category_id;

    Object.find({"category_id": category_id}, function(err, object){
        if(err) return res.status(500).send({error: 'database failure'});
        console.log("object", object);
        res.json(object);
    })
});
router.post('/object' , /*isAuthenticated,*/  function(req,res){
    //var object = new Object();
    var info = req.body.info

    Object.insertMany(info, function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

router.put('/object' , /*isAuthenticated,*/  function(req,res){
    var object = new Object();
    var array = req.body
    var funArray = []
    console.log("array", array)
    // array 배열로 받아야 함. - 예외처리 필요
    array.forEach(function(item, index){
        var obj = 
            {
                updateOne : {
                    filter: {_id: item._id },
                    update: {$set: {info: item.info}},
                    upsert: false
                }
            }
       funArray.push(obj)
    });
    Object.bulkWrite(funArray).catch(e => {
        res.json(0);
        console.log(e);
    });

    res.json(1);
});
module.exports = router;
