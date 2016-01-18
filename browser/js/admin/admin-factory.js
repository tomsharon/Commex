app.factory('adminFactory', function($http, AuthService){
	return {
    getAllUsers: function(){
			return $http.get('/api/users')
		},

    getAllItems: function(){
      return $http.get('/api/items')
    },

    getItemDetails: function(){
      return $http.get('/api/categories/' + categoryName + '/' + itemId)
    },

    getUser: function(userId){
      return $http.get('/api/users/' + userId)
    }
  }
})
