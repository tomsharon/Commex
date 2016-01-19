app.controller('createUserCtrl', function($scope, adminFactory, $state){
  $scope.create = function(user){
    adminFactory.createUser(user)
    .then(function(){
      $state.go('admin')
    })
  }
})
