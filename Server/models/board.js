var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


var boardSchema = new Schema({
	id: Number,
	username: String,
	category: String,
    title: String,
    contents: String,
    published_date: { type: Date, default: Date.now  }
});
boardSchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'id' , startAt : 1 });

module.exports = mongoose.model('board', boardSchema);
