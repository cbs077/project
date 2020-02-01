
//수정필요
module.exports = function(app, Book)
{
    // GET ALL BOOKS
	app.get('/', function(req,res){
		res.send('Hello World1');
    });

    app.get('/api/books', function(req,res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });     
}
