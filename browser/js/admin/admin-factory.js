app.factory('adminFactory', function($http, AuthService){
	return {
    getAllUsers: function(){
			return $http.get('/api/users')
		},
    getAllItems: function(){
      return $http.get('/api/items')
    },
		getAllReview: function(){
			return $http.get('/api/reviews')
		},
		getAllOrders: function(){
			return $http.get('/api/orders')
		},
    getItemDetails: function(){
      return $http.get('/api/categories/' + categoryName + '/' + itemId)
    },
    getUser: function(userId){
      return $http.get('/api/users/' + userId)
    },
		getItem: function(itemId){
			return $http.get('/api/items/' + itemId)
		},
		updateUser: function(user){
			return $http.put('/api/users/' + user._id, user)
		},
		updateItem: function(item){
			return $http.put('/api/items/' + item._id, item)
		},
		createItem: function(item){
			return $http.post('/api/items/', item)
		},
		createUser: function(user){
			return $http.post('/api/users/', user)
		},
		deleteUser: function(user){
			return $http.delete('/api/users/' + user.userId)
		},
		deleteItem: function(item){
			return $http.delete('/api/items/' + item.itemId)
		}
  }
})
