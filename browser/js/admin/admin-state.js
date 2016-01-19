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
})
