var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var CategoryInfoSchema = new Schema({
	id: Number,
	name: String,
	userId: Number,
	fieldList: Array
});
CategoryInfoSchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'id' , startAt : 1 });
module.exports = mongoose.model('categoryinfos', CategoryInfoSchema);
