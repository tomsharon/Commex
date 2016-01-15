app.controller('itemCtrl', function($scope, $stateParams, $state, itemDetails, itemFactory, AuthService){
	// console.log(itemDetails);
	$scope.item = itemDetails;
	$scope.addToCart = itemFactory.addToCart;
	$scope.authclick = function() {
		return AuthService.getLoggedInUser()
			.then(function (user) {
			    $scope.user = user
			});			
	}
})