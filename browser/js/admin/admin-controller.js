app.controller('adminCtrl', function($scope, allUsers, adminFactory, $state){
  $scope.users = allUsers;
  $scope.deleteUser = function(userId){
    adminFactory.deleteUser(userId)
    .then(function(){
      $state.reload();
    })
  }

})
