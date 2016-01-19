var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  reviewRating:       { type: Number, required: true },
  reviewDescription:  { type: String, required: true },
  reviewDate:         { type: Date, default: Date.now, required: true },
  reviewAuthor:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewProduct: 	  { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
})

module.exports = mongoose.model('Review', ReviewSchema);
