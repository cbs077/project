var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


var categorySchema = new Schema({
	id: Number,
	firstCategory: String,
	secondCategory: String,
    published_date: { type: Date, default: Date.now  }
});
categorySchema.plugin( autoIncrement.plugin , { model : 'products' , field : 'id' , startAt : 1 });

module.exports = mongoose.model('category', categorySchema);
