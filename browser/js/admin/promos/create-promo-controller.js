app.controller('createPromoCtrl', function($scope, adminFactory, $state){
  $scope.create = function(promo){
    adminFactory.createPromo(promo)
    .then(function(){
      $state.go('promos')
    })
  }
})
