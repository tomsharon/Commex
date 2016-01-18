app.config(function($stateProvider){
	$stateProvider
  .state('admin', {
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'adminCtrl',
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
			},
      allItems: function(adminFactory, $stateParams){
        return adminFactory.getAllItems()
        .then(function(items){
          console.log('All Items done got had')
          return items.data;
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
    controller: function($scope){
      $scope.currentUser = getUser || null;
    },
    resolve: {
      getUser: function(adminFactory, $stateParams){
        console.log('Getting user: ', $stateParams.userId);
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
})
