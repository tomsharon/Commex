app.controller('editPromoCtrl', function($scope, getPromo, adminFactory, $state){
  $scope.promo = getPromo;
  $scope.update = function(promo){
    adminFactory.updatePromo(promo)
    .then(function(){
      $state.go('promos')
    })
  }
})
