app.controller('editItemCtrl', function($scope, getItem, adminFactory, $state){
  $scope.item = getItem;
  $scope.update = function(item){
    adminFactory.updateItem(item)
    .then(function(){
      $state.go('items')
    })
  }
})
