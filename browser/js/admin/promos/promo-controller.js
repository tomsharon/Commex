app.controller('promosCtrl', function($scope, allPromos, adminFactory, $state){
  $scope.promos = allPromos;
  $scope.deletePromo = function(promoId){
    adminFactory.deletePromo(promoId)
    .then(function(){
      $state.reload();
    })
  }
})
