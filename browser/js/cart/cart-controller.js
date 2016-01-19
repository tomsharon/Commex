app.controller('cartCtrl', function($scope, $state, cartFactory, localStorageService){
	
	$scope.cart = []
	cartFactory.getCart()
		.then(function(cart) {
			var quantities = localStorageService.get("quantityArray")
			for(var i = 0; i < cart.length; i++) {
				$scope.cart.push({item: cart[i], quantity: quantities[i]})
			}
			$scope.totalPrice = cartFactory.getTotal($scope.cart)
		})

	$scope.applyPromo = function(code, price) {
		$scope.totalPrice = cartFactory.applyPromo(code, price)
	}
})


//upon checkout:

//send order to back end, and mark order complete as well as save totalPrice
//then send email to user