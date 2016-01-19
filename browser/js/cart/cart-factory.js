app.factory('cartFactory', function($http, AuthService, localStorageService){
	return {
		getCart: function() {
			var user;
			return AuthService.getLoggedInUser()
				.then(function (loggedInUser) {
				    user = loggedInUser;
				    //Logged in users:
					if(user) {
						return $http.get("/api/orders?user=" + user._id + "&status=Incomplete")
							.then(function(response) {
								console.log("This is response.data", response.data)
								return response.data[0].items
							})

					}
					//Non-logged-in users
					else {
						var orders = localStorageService.get("orders")
						var promiseArray = [];
						var quantityArray = [];
						orders.forEach(function(item) {
							quantityArray.push(item.quantity)
							promiseArray.push($http.get("/api/items/" + item.item).then(function(response){
								return response.data;
							}));
						});
						localStorageService.set("quantityArray", quantityArray)
						return Promise.all(promiseArray);
					}
				})
		},

		checkout: function(cart) {

		},
		getTotal: function(cart) {
			var total = 0;
			cart.forEach(function(item) {
				total += item.item.price * item.quantity;
			})
			return total;
		},
		// getTotal: function(cart, code) {
		// 	var total = 0;
		// 	cart.forEach(function(item) {
		// 		total += item.item.price * item.quantity;
		// 	})
		// 	if(code && code.includes("BUCKS")) {
		// 		var dollarsOff = Number(code.replace("BUCKS", ""))
		// 		var discountedPrice = total - dollarsOff
		// 		return discountedPrice
		// 	}
		// 	if(code && code.includes("PERC")) {
		// 		console.log("hitting")
		// 		var percentOff = Number(code.replace("PERC", ""))
		// 		var percentUserWillPay = (100 - percentOff) / 100
		// 		// console.log(originalTotalPrice * percentUserWillPay)
		// 		var discountedPrice = total * percentUserWillPay
		// 		return discountedPrice
		// 	}
		// 	return total;
		// },		
		applyPromo: function(code, originalTotalPrice) {
			console.log("this is the promo code", code)
			console.log("this is the originalTotalPrice", originalTotalPrice)
			if(code.includes("BUCKS")) {
				var dollarsOff = Number(code.replace("BUCKS", ""))
				return originalTotalPrice - dollarsOff
			}
			if(code.includes("PERC")) {
				console.log("hitting")
				var percentOff = Number(code.replace("PERC", ""))
				var percentUserWillPay = (100 - percentOff) / 100
				console.log(originalTotalPrice * percentUserWillPay)
				return originalTotalPrice * percentUserWillPay
			}
		}
	}
})

//upon checkout:

//send order to back end, and mark order complete as well as save totalPrice
//then send email to user