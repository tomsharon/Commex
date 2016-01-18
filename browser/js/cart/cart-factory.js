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
						return localStorageService.get("orders")
					}
				})
		},
		checkout: function(cart) {

		}
	}
})

//second .then() to get items