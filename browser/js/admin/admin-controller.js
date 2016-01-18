app.controller('adminCtrl', function($scope, allUsers, adminFactory, $state){
  $scope.users = allUsers;
})
