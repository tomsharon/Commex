app.factory('itemFactory', function($http, AuthService, localStorageService){
	return {
		getItem: function(categoryName, itemId){
			return $http.get('/api/categories/' + categoryName + '/' + itemId)
		},
		getReviews: function(reviewId){
			return $http.get('api/reviews/' + reviewId);
		},
		addReview: function(review){
			return $http.post('api/reviews/', review);
		},
		addToCart: function(itemId) {
			var user;
			AuthService.getLoggedInUser()
				.then(function (loggedInUser) {
				    user = loggedInUser;
				    //If user is logged in
					if(user) {
						//check to see if he has any orders
						$http.get("/api/orders?user=" + user._id + "&status=Incomplete")
							.then(function(response) {
								return response.data
							})
							.then(function(arrayOfOrders) {
								//if user has existing order, update order and persist to DB
								if(arrayOfOrders[0]) {

									var updatedOrderItems = arrayOfOrders[0].items;
									updatedOrderItems.push({ item: itemId, quantity: itemQuantity });

									return $http.put("/api/orders/" + arrayOfOrders[0]._id, {items: updatedOrderItems})
										.then(function(response) {
											return response.data
										}, function(error) {
											console.error(error)
										})
								}
								//else, create new order and persist to DB
								else {
									console.log("Creating new order...")
									return $http.post("/api/orders", {items: [{ item: itemId, quantity: itemQuantity }], user: user._id})
										.then(function(response) {
											return response.data
										})
								}
							})
					}
					//If user is not logged in, maintain order on their local storage
					else {

						var orders = localStorageService.get("orders")
						var itemInfo = { item: itemId, quantity: itemQuantity };
						console.log(itemInfo);

						if(!orders) {
							localStorageService.set("orders", [itemInfo])
						}
						else {
							orders.push(itemInfo)
							localStorageService.set("orders", orders)
						}


						//Upon checkout, persist order to DB

						//To clear local storage:
						// return localStorageService.clearAll()
					}
				});
		}
	};
})
