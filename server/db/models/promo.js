var mongoose = require('mongoose');

var PromoSchema = new mongoose.Schema({
  type: { type: String, enum:["dollars", "percent"], required: true },
  value: { type: Number, required: true },
  expiry: { type: Date, default: null },
  code: { type: String, required: true}
});

module.exports = mongoose.model('Promo', PromoSchema);
