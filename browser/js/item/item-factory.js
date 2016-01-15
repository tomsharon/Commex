app.factory('itemFactory', function($http){
	return {
		getItem: function(categoryName, itemId){
			return $http.get('/api/categories/' + categoryName + '/' + itemId)
		},
		addToCart: function(itemId) {
			return $http.post("/api/orders")
		}
	};
})
