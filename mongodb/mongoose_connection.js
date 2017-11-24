var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27500/users');

var schema = {
name: String,
email: String,
gender: String,
job: String,
favourite_colours: String,
avatar: String
}

var document = new mongoose.Schema(schema);

var USERCLASS = mongoose.model('employees', document);

module.exports = USERCLASS