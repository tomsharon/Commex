app.controller('itemCtrl', function($scope, itemDetails, itemFactory, $interval){
	// console.log(itemDetails);
	$scope.quantity = 1;
	$scope.item = itemDetails;
	$scope.addToCart = itemFactory.addToCart;
	$scope.available = itemDetails.inventory;
	$scope.Range = function(start, end) {
	    var result = [];
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }
	    return result;
	};
});