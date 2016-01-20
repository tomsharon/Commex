app.controller('ordersCtrl', function($scope, allOrders, adminFactory, $state){
  $scope.orders = allOrders;
  $scope.deleteOrder = function(orderId){
    adminFactory.deleteOrder(orderId)
    .then(function(){
      $state.reload();
    })
  }
})
