var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');

var UserSchema = new Schema({
	id: Number,
	username: String,
	password: String,
	firstName: String,
	lastName: String
});
//bookSchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'id' , startAt : 1 });

module.exports = mongoose.model('user', UserSchema);
