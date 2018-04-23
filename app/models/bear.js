
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
}, { collection: 'data' });

module.exports = mongoose.model('pear', BearSchema);
