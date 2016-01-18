app.controller('itemCtrl', function($scope, itemDetails, itemFactory){
	// console.log(itemDetails);
	$scope.item = itemDetails;
	$scope.addToCart = itemFactory.addToCart;
})