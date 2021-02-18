var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataTable = new Schema({
	id: Number,
	username: String,
	password: String,
	firstName: String,
	lastName: String
});
module.exports = mongoose.model('data_table', DataTable);
