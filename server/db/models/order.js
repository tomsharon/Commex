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
  promo:  { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' },
  totalPrice: { type: Number },
  //Email + Address for non logged in users:
  email: { type: String },
  name: { type: String },
  streetName: { type: String },
  apt: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number }
});


// function getTotal() {
//   var total = 0
//   items.forEach(function(item) {
//     total += item.item.price
//   })
//   return total;
// }




//PRESAVE HOOK TO SAVE TOTAL SPENT 

//Presave hook to make sure every order has address before we switch status to "Placed"


module.exports = mongoose.model('Order', OrderSchema);

