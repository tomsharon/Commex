var mongoose = require('mongoose');
var User = require('./user');

var ReviewSchema = new mongoose.Schema({
  reviewRating:       { type: Number, required: true },
  reviewDescription:  { type: String, required: true },
  reviewDate:         { type: Date, default: Date.now, required: true },
  reviewAuthor:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

mongoose.model('Review', ReviewSchema);
