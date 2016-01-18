app.controller('adminCtrl', function($scope, allUsers, allItems, adminFactory, $state){
  $scope.users = allUsers;
  $scope.items = allItems;
})
