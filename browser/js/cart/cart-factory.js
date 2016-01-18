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
						orders.forEach(function(item) {
							promiseArray.push($http.get("/api/items/" + item.item).then(function(response){
								return response.data;
							}));
						});
						return Promise.all(promiseArray);
					}
				})
			},

		checkout: function(cart) {

		}
	}
})

//second .then() to get items