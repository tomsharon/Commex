app.controller('createItemCtrl', function($scope, adminFactory, $state){
  $scope.create = function(item){
    adminFactory.createItem(item)
    .then(function(){
      $state.go('items')
    })
  }
})
