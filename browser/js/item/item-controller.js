app.controller('itemCtrl', function($scope, itemDetails, itemFactory){
	// console.log(itemDetails);
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
})