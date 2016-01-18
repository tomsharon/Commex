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

		updateUser: function(user){
			return $http.put('/api/users/' + user._id, user)
		}
  }
})
