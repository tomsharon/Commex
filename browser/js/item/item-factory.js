app.factory('itemFactory', function($http){
	console.log("hello I am itemFactory")
	return {
		getItem: function(itemId){
			console.log("get item called: " + itemId)
			return $http.get('/api/item/' + itemId)
		}
	};
})