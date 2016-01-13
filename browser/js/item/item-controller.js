app.controller('itemCtrl', function($scope, itemDetails, $state){
	$scope.item = itemDetails($state.params.itemId);
})