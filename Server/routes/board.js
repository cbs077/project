const { isAuthenticated } = require('../middleware/auth');

module.exports = function(app, Board)
{
    // GET ALL BOOKS
    app.get('/api/board' , isAuthenticated,  function(req,res){
    	console.log("board");
    	Board.find(function(err, board){
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(board);
            res.json(board);
        })
    });

    // GET SINGLE BOOK
    app.get('/api/board/:board_id', function(req, res){
        Board.findOne({_id: req.params.board_id}, function(err, board){
            if(err) return res.status(500).json({error: err});
            if(!board) return res.status(404).json({error: 'board not found'});
            res.json(board);
        })
    });

    // GET BOOK BY AUTHOR
    app.get('/api/board/author/:author', function(req, res){
        Board.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(board.length === 0) return res.status(404).json({error: 'board not found'});
            res.json(board);
        })
    });

    // CREATE BOOK
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

    // UPDATE THE BOOK
    app.put('/api/board/:board_id', function(req, res){
        Book.update({ _id: req.params.board_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'board not found' });
            res.json( { message: 'board updated' } );
        })
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });

        });
    */
    });

    // DELETE BOOK
    app.delete('/api/board/:board_id', function(req, res){
        Board.remove({ _id: req.params.board_id }, function(err, output){
        	console.log( "delete:", req.params.board_id );
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });
     
}
