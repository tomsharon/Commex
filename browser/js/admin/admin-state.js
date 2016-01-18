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
			allUsers: function(adminFactory, $stateParams){
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
    templateUrl: 'js/admin/edit-user.html',
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
	.state('items', {
		url: '/admin/items',
		templateUrl: 'js/admin/items/items.html',
		controller: 'itemsCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			allItems: function(adminFactory, $stateParams){
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
	.state('createItem',{
		url: '/admin/items/create',
		templateUrl: 'js/admin/items/create-item.html',
		controller: 'createItemCtrl',
		data: {
			authenticate: true
		},
		resolve: {
			console.log('hello');
		}
	})
})
