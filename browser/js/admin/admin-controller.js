app.controller('adminCtrl', function($scope, allUsers, allItems, adminFactory){
  $scope.users = allUsers;
  $scope.items = allItems;
  $scope.editUser = function(user){
    $state.go('editUser/' + user)
  }
})
