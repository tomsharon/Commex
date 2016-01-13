var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  unit: { type: String, required: true },
  inventory: { type: Number, required: true },
  shortDescription: { type: [String], required: true },
  longDescription: {type: String}
})

mongoose.model('Item', ItemSchema);
