app.factory('itemFactory', function($http){
	return {
		getItem: function(itemId){
			return $http.get('/api/item/' + itemId)
		}
	};
})