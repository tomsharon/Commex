app.factory('itemFactory', function($http, AuthService){
	return {
		getItem: function(categoryName, itemId){
			return $http.get('/api/categories/' + categoryName + '/' + itemId)
		},
		addToCart: function(itemId) {
			console.log("THIS IS itemId",itemId)
			AuthService.getLoggedInUser()
				.then(function (user) {
				    var user = user
				});
			if(user) {
				return $http.post("/api/orders", {items: [itemId]})
					.then(function(response) {
						return response.data
					})
			}
			else {
				//non-user orders need be stored in local storage
				//use angular-local-storage-module
			}
		}
	};
})