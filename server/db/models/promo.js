var mongoose = require('mongoose');

var PromoSchema = new mongoose.Schema({
  type: { type: String, enum:["dollars", "percent"], required: true },
  value: { type: Number, required: true },
  created: { type: Date, default: Date.now },
  expires: { type: Date, default: Date.now() + 1000000000 },
  code: { type: String, required: true}
});

module.exports = mongoose.model('Promo', PromoSchema);
