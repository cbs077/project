var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var objectaSchema = new Schema({
	id: Number,
	category_id: Number,
	info: Object,
	ida: Number,
});

objectaSchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'id' , startAt : 1 });
module.exports = mongoose.model('objectas', objectaSchema);
