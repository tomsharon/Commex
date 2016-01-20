app.factory('cartFactory', function($http, AuthService, localStorageService, $state){
	return {
		updateCart: function(){
			console.log("updated the shit out of that cart");
		},
		getCart: function() {
			console.log("cartFactory.getCart() was executed!")
			var user;
			return AuthService.getLoggedInUser()
				.then(function (loggedInUser) {
				    user = loggedInUser;
				    //Logged in users:
					if(user) {
						console.log("there was a user! gonna grab his orders");
						return $http.get("/api/orders?user=" + user._id + "&status=Incomplete")
							.then(function(response) {
								return response.data[0].items;
							})

					}
					//Non-logged-in users
					else {
						console.log("no user, let's check localStorage")
						var orders = localStorageService.get("orders")
						var promiseArray = [];
						var quantityArray = [];
						if (!orders){
							//there is no logged in user and the unauthenticated user has no items
							return null;
						}
						orders.forEach(function(item) {
							quantityArray.push(item.quantity)
							console.log("item.item is a string if below is true");
							console.log(typeof(item.item))
							if(typeof(item.item) === 'string'){
								console.log("item.item is a string like this:");
								console.log(item.item);
								promiseArray.push($http.get("/api/items/" + item.item).then(function(response){
									return response.data;
								}));
							}
							else{
								console.log("item.item is an object so we have to get its _id, see:");
								console.log(item.item);
								promiseArray.push($http.get("/api/items/" + item.item._id).then(function(response){
									return response.data;
								}));
							}
						});
						localStorageService.set("quantityArray", quantityArray)
						console.log("should be returning an array of promises:")
						console.log(promiseArray);
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
			// if(code.includes("BUCKS")) {
			// 	var dollarsOff = Number(code.replace("BUCKS", ""))
			// 	return originalTotalPrice - dollarsOff
			// }
			// if(code.includes("PERC")) {
			// 	var percentOff = Number(code.replace("PERC", ""))
			// 	var percentUserWillPay = (100 - percentOff) / 100
			// 	return originalTotalPrice * percentUserWillPay
			// }
			return $http.get("/api/promos")
				.then(function(response) {
					for(var i = 0; i < response.data.length; i++) {
						if(code === response.data[i].code) {
							var percentUserWillPay = (100 - response.data[i].value) / 100
							console.log("This is percentUserWillPay", percentUserWillPay)
							console.log("This is originalTotalPrice", originalTotalPrice)
							return originalTotalPrice * percentUserWillPay;
						}
					}
				})
		},
		checkOut: function(cart, totalPrice, promoCode, nonLoggedInUser) {
			// console.log("this is the cart", cart)
			var user;
			AuthService.getLoggedInUser()
				.then(function(loggedInUser) {
					user = loggedInUser
					//Logged in users:
					if(user) {
						console.log("THIS IS THE CART",cart)
						$http.put("/api/orders/" + cart[0]._id, {
							status: "Placed",
							user: user,
							items: cart,
							promo: promoCode,
							totalPrice: totalPrice
						})
						.then(function() {
							$state.go("thankYou");
							$http.post("/api/thankyou", {name: user.name, email: user.email, cart: cart, totalPrice: totalPrice})
						}, function(err) {
							console.error(err)
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
