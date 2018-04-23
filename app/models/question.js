
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    hi: String,
    name: String,
    content: String
}, { collection: 'question' });

module.exports = mongoose.model('question', QuestionSchema);
