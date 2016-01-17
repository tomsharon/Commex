app.controller('cartCtrl', function($scope, $state, cartFactory){

	cartFactory.getCart()
		.then(function(cart) {
			console.log("This is the cart", cart)
			$scope.cart = cart
		})
	

	//NEED TO .populate() for logged in users
	//NEED TO AJAX request w/ itemID for non-logged in users

})