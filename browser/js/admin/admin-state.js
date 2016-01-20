app.config(function($stateProvider){
	$stateProvider
  .state('admin', {
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'adminCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			allUsers: function(adminFactory){
				return adminFactory.getAllUsers()
				.then(function(users){
					return users.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			}
		}
	})
  .state('editUser', {
    url: '/admin/edituser/:userId',
    templateUrl: 'js/admin/users/edit-user.html',
    controller: 'editUserCtrl',
		data: {
			authenticate: true
		},
    resolve: {
      getUser: function(adminFactory, $stateParams){
        return adminFactory.getUser($stateParams.userId)
        .then(function(user){
          return user.data
        })
        .catch(null, function(error){
          console.log(error)
        })
      }
    }
  })
	.state('createUser', {
		url: '/admin/createuser',
		templateUrl: 'js/admin/users/create-user.html',
		controller: 'createUserCtrl',
		data: {
			authenticate: true
		}
	})
	.state('items', {
		url: '/admin/items',
		templateUrl: 'js/admin/items/items.html',
		controller: 'itemsCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			allItems: function(adminFactory){
				return adminFactory.getAllItems()
				.then(function(items){
					return items.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			}
		}
	})
	.state('editItem', {
		url: '/admin/items/:itemId',
		templateUrl: 'js/admin/items/edit-item.html',
		controller: 'editItemCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			getItem: function(adminFactory, $stateParams){
				return adminFactory.getItem($stateParams.itemId)
				.then(function(item){
					return item.data
				})
				.catch(null, function(error){
					console.log(error)
				})
			}
		}
	})
	.state('createItem', {
		url: '/admin/createitem',
		templateUrl: 'js/admin/items/create-item.html',
		controller: 'createItemCtrl',
		data: {
			authenticate: true
		}
	})
	.state('orders', {
		url: '/admin/orders',
		templateUrl: 'js/admin/orders/orders.html',
		controller: 'ordersCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			allOrders: function(adminFactory){
				return adminFactory.getAllOrders()
				.then(function(orders){
					return orders.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			}
		}
	})
	.state('editOrder', {
		url: '/admin/orders/:orderId',
		templateUrl: 'js/admin/orders/edit-order.html',
		controller: 'editOrderCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			getOrder: function(adminFactory, $stateParams){
				return adminFactory.getOrder($stateParams.orderId)
				.then(function(order){
					return order.data
				})
				.catch(null, function(error){
					console.log(error)
				})
			}
		}
	})
	.state('promos', {
		url: '/admin/promos',
		templateUrl: 'js/admin/promos/promo.html',
		controller: 'promosCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			allPromos: function(adminFactory){
				return adminFactory.getAllPromos()
				.then(function(promos){
					console.log(promos.data)
					return promos.data
				})
				.catch(null, function(error){
					console.log(error)
				})
			}
		}
	})
	.state('editPromo', {
		url: '/admin/promos/:promoId',
		templateUrl: 'js/admin/promos/edit-promo.html',
		controller: 'editPromoCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			getPromo: function(adminFactory, $stateParams){
				return adminFactory.getPromo($stateParams.promoId)
				.then(function(promo){
					return promo.data
				})
				.catch(null, function(error){
					console.log(error)
				})
			}
		}
	})
	.state('createPromo', {
		url: '/admin/createpromo',
		templateUrl: 'js/admin/promos/create-promo.html',
		controller: 'createPromoCtrl',
		data: {
			authenticate: true
		}
	})
})
