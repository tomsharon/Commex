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
          console.log('All Users done got had')
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
    resolve: {
      getUser: function(adminFactory, $stateParams){
        console.log('Getting user: ', $stateParams.userId);
        return adminFactory.getUser($stateParams.userId)
        .then(function(user){
					console.log('Inside the then statement');
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
})
