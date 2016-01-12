var mongoose = require('mongoose');

var Item = require('./item');
var User = require('./user')


var OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
  orderNumber: { type: Number, required: true },
  dateOrdered: { type: Date, default: Date.now, required: true },
  itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
  totalSpent: { type: Number, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
