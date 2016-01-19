app.controller('editUserCtrl', function($scope, getUser, adminFactory, $state){
  $scope.user = getUser;
  $scope.update = function(user){
    adminFactory.updateUser(user)
    .then(function(){
      $state.go('admin')
    })
  }
})
