var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var objectSchema = new Schema({
	id: Number,
	category_id: Number,
	info: Object,
	ida: Number,
});

objectSchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'ida' , startAt : 1 });
module.exports = mongoose.model('objects', objectSchema);
