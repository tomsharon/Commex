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
		getAllPromos: function(){
			return $http.get('/api/promos')
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
		getOrder: function(orderId){
			return $http.get('/api/orders/' + orderId)
		},
		getPromo: function(promoId){
			return $http.get('/api/promos/' + promoId)
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
		createPromo: function(promo){
			return $http.post('/api/promos/', promo)
		},
		deleteUser: function(user){
			return $http.delete('/api/users/' + user.userId)
		},
		deleteItem: function(item){
			return $http.delete('/api/items/' + item.itemId)
		},
		deleteOrder: function(order){
			return $http.delete('/api/orders/' + order.orderId)
		},
		deletePromo: function(promo){
			console.log(promo)
			return $http.delete('/api/promos/' + promo.promoId)
		}
  }
})
