var router = require('express').Router();
var nodemailer = require('nodemailer');
module.exports = router;

var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: "commexorders@gmail.com",
       pass: "CommoditiesRock!",
   }
}, {
   // default values for sendMail method
   from: 'commexorders@gmail.com',
   headers: {
       'Hi': '123'
   }
});

router.post("/", function(req, res, next) {

	var summary = ""
	for(var i = 0; i < req.body.cart.length; i++) {
		if(i < req.body.cart.length - 1 ) summary += "Name: " + req.body.cart[i].item.itemName + ",<br>" + "Price: $" + req.body.cart[i].item.price + ".00,<br>" + "Quantity: " + req.body.cart[i].quantity + ",<br>"
		else summary += "Name: " + req.body.cart[i].item.itemName + ",<br>" + "Price: $" + req.body.cart[i].item.price + ".00,<br>" + "Quantity: " + req.body.cart[i].quantity
	}

	var mailOptions = {
		from: "Tom Sharon 🍻 <commexorders@gmail.com>",
		to: req.body.email,
		subject: "Thank You For Shopping With Commex!",
		html: "<h1>Thank you for shopping with Commex, " + req.body.name + "!</h1> <h3>Here's your order summary:</h3> <div><p>" + summary + "</p></div> <h4>Total: $" + req.body.totalPrice + ".00</h4>"
	}

	transporter.sendMail(mailOptions, function(err, info){
	    if(err){
	        return console.error(err);
	    }
	    console.log('Message sent: ' + info.response);
	})

})