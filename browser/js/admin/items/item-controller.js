app.controller('itemsCtrl', function($scope, allItems, adminFactory, $state){
  $scope.items = allItems;
  $scope.deleteItem = function(itemId){
    adminFactory.deleteItem(itemId)
    .then(function(){
      $state.reload();
    })
  }
})
