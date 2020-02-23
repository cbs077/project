const router = require('express').Router();
const { isAuthenticated } = require('../middleware/auth');

const Board = require('../models/board');
const User = require('../models/user');

router.put('/rank/:board_id', function(req, res){
    var rank =  Number(req.body.rank )
    var board =  req.params.board
    var rankCountquery = {}
    var toltalCountquery = {}
    var countQuery
    switch( rank ){  
        case 1 : 
            //rankCountquery = {  }
            //toltalCountquery = { }
            countQuery = { firstRankCount : 1, totalScore : 3 }
            /*Board.find(function(err, board){
                if(err) return res.status(500).send({error: 'database failure'});
                console.log(board);
                res.json(board);
            })*/
        break
        case 2 : 
             countQuery = { firstRankCount : 2, totalScore : 2 }
        //    rankCountquery = { secondRankCount : rank }
        break 
        default : 
        break 
    }
    new Promise(function( resolve, rejected ){
        return
    })
    .then( function(){

    })
    // 유저 1순위 글 추가
    // 사용자수new
    console.log( 'rankCountquery', rankCountquery)
    Board.update({ _id: req.params.board_id }, { $inc:  countQuery }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure1' });
        if(!output) return res.status(404).json({error: 'board not found'});
        res.json( { message: 'board updated' } );
    })
});
router.get('/' , /*isAuthenticated,*/  function(req,res){
    console.log("board");
    //var Board = new Board();
    Board.find(function(err, board){
        if(err) return res.status(500).send({error: 'database failure'});
        console.log(board);
        res.json(board);
    })
});

// GET SINGLE board
router.get('/:board_id', function(req, res){
    var Board = new Board();
    Board.findOne({_id: req.params.board_id}, function(err, board){
        if(err) return res.status(500).json({error: err});
        if(!board) return res.status(404).json({error: 'board not found'});
        res.json(board);
    })
});

// GET board BY AUTHOR
router.get('/author/:author', function(req, res){
    var Board = new Board();
    Board.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
        if(err) return res.status(500).json({error: err});
        if(board.length === 0) return res.status(404).json({error: 'board not found'});
        res.json(board);
    })
});

// CREATE board
router.post('/', function(req, res){
    var board = new Board();
    console.log(req.body);
    board.username = req.body.username;
    board.category = req.body.category;
    board.title = req.body.title;
    board.contents = req.body.contents;   
//        book.published_date = new Date(req.body.published_date);

    board.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

// UPDATE board
router.put('/:board_id', function(req, res){
    Book.update({ _id: req.params.board_id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'board not found' });
        res.json( { message: 'board updated' } );
    })
});
// DELETE board
router.delete('/:board_id', function(req, res){

    Board.remove({ _id: req.params.board_id }, function(err, output){
        console.log( "delete:", req.params.board_id );
        if(err) return res.status(500).json({ error: "database failure" });

        res.status(204).end();
    })
});
module.exports = router;
//수정필요
/*
module.exports = function(app, Board)
{
    // GET ALL board
    roter.get('/api/board' , isAuthenticated,  function(req,res){
    	console.log("board");
    	Board.find(function(err, board){
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(board);
            res.json(board);
        })
    });

    // GET SINGLE board
    app.get('/api/board/:board_id', function(req, res){
        Board.findOne({_id: req.params.board_id}, function(err, board){
            if(err) return res.status(500).json({error: err});
            if(!board) return res.status(404).json({error: 'board not found'});
            res.json(board);
        })
    });

    // GET board BY AUTHOR
    app.get('/api/board/author/:author', function(req, res){
        Board.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(board.length === 0) return res.status(404).json({error: 'board not found'});
            res.json(board);
        })
    });

    // CREATE board
    app.post('/api/board', function(req, res){
        var board = new Board();
        console.log(req.body);
        board.username = req.body.username;
        board.category = req.body.category;
        board.title = req.body.title;
        board.contents = req.body.contents;
        
       
//        book.published_date = new Date(req.body.published_date);

        board.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // UPDATE board
    app.put('/api/board/:board_id', function(req, res){
        Book.update({ _id: req.params.board_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'board not found' });
            res.json( { message: 'board updated' } );
        })
   \
    });

    // DELETE board
    app.delete('/api/board/:board_id', function(req, res){
        Board.remove({ _id: req.params.board_id }, function(err, output){
        	console.log( "delete:", req.params.board_id );
            if(err) return res.status(500).json({ error: "database failure" });

            res.status(204).end();
        })
    });
     
}
*/