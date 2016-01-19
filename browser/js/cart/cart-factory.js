app.factory('cartFactory', function($http, AuthService, localStorageService, $state){
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
		getTotal: function(cart) {
			var total = 0;
			cart.forEach(function(item) {
				total += item.item.price * item.quantity;
			})
			return total;
		},		
		applyPromo: function(code, originalTotalPrice) {
			if(code.includes("BUCKS")) {
				var dollarsOff = Number(code.replace("BUCKS", ""))
				return originalTotalPrice - dollarsOff
			}
			if(code.includes("PERC")) {
				var percentOff = Number(code.replace("PERC", ""))
				var percentUserWillPay = (100 - percentOff) / 100
				return originalTotalPrice * percentUserWillPay
			}
		},
		checkOut: function(cart, totalPrice, promoCode, nonLoggedInUser, orderId) {
			// console.log("this is the cart", cart)
			var user;
			AuthService.getLoggedInUser()
				.then(function(loggedInUser) {
					user = loggedInUser
					//Logged in users:
					if(user) {
						$http.put("/api/orders/" + orderId, {
							status: "Placed",
							user: user,
							items: cart,
							promo: promoCode, 
							totalPrice: totalPrice
						})
						.then(function() {
							$state.go("thankYou");
							$http.post("/api/thankyou", {name: user.name, email: user.email, cart: cart, totalPrice: totalPrice})
						})
					}
					//Non-logged-in users
					else {
						$http.post("/api/orders", {
							status: "Placed",
							items: cart,
							promo: promoCode, 
							totalPrice: totalPrice,
							email: nonLoggedInUser.email,
							name: nonLoggedInUser.name,
							streetName: nonLoggedInUser.street,
							apt: nonLoggedInUser.apt,
							city: nonLoggedInUser.city,
							state: nonLoggedInUser.state,
							zipCode: nonLoggedInUser.zip
						})
						.then(function() {
							$state.go("thankYou");
							localStorageService.clearAll();
							$http.post("/api/thankyou", {name: nonLoggedInUser.name, email: nonLoggedInUser.email, cart: cart, totalPrice: totalPrice})
						})												
					}
				})
		}
	}
})