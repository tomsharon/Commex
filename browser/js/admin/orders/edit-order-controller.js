app.controller('editOrderCtrl', function($scope, getOrder, adminFactory, $state){
  $scope.order = getOrder;
  $scope.update = function(order){
    adminFactory.updateOrder(order)
    .then(function(){
      $state.go('orders')
    })
  }
})
