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
								console.log("This is Matt's cart", response.data)
								return response.data[0].items
							})

					}
					//Non-logged-in users
					else {
						console.log("Non-logged-in user's cart", localStorageService.get("orders"))
						return localStorageService.get("orders")
					}
				})
		}
	}
})

//second .then() to get items