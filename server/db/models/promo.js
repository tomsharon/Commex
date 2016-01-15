var mongoose = require('mongoose');

var PromoSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  expiry: { type: Date, default: null },
});

module.exports = mongoose.model('Promo', PromoSchema);
