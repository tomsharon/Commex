var mongoose = require('mongoose');

var Item = require('./item');
var User = require('./user')


var OrderSchema = new mongoose.Schema({
  status: {type: String, enum: ["Incomplete", "Placed", "Shipped"], default: "Incomplete"},	
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateOrdered: { type: Date, default: Date.now },
  items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        	quantity: { type: Number, default: 1 }
		}],
  promo:  { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' }
  // totalSpent: { type: Number, required: true }
});


//Add totalSpent virtual
OrderSchema.virtual('totalPrice').get(function() {
	var total = 0;
	this.items.forEach(function(item) {
		total += item.price;
	})
	return total;
})



//PRESAVE HOOK TO SAVE TOTAL SPENT 


module.exports = mongoose.model('Order', OrderSchema);

