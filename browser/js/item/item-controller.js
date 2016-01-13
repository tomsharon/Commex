app.controller('itemCtrl', function($scope, $stateParams, $state, itemDetails){
	console.log(itemDetails);
	$scope.item = itemDetails;
})