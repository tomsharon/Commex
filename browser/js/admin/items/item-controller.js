app.controller('itemsCtrl', function($scope, allItems, adminFactory, $state){
  $scope.items = allItems;
})
