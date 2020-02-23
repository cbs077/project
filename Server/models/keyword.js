var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeywordSchema = new Schema({
	keyword: String,
	root: String,
	rootC: String
});
module.exports = mongoose.model('keywords', KeywordSchema);
