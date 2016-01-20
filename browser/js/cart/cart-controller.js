app.controller('cartCtrl', function($scope, $state, cartFactory, localStorageService, AuthService){

	AuthService.getLoggedInUser()
		.then(function(loggedInUser) {
			$scope.user = loggedInUser
			console.log("this is user", $scope.user)
		})

	$scope.nonLoggedInUser = {};

	$scope.cart = []
	cartFactory.getCart()
		.then(function(cart) {
			if($scope.user) {
				$scope.cart = cart
				console.log("THIS IS USER'S CART TOM", $scope.cart)
		}
			if(!$scope.user) {
				console.log("PLEASE")
				var quantities = localStorageService.get("quantityArray")
				for(var i = 0; i < cart.length; i++) {

					$scope.cart.push({item: cart[i], quantity: quantities[i]})
					console.log("This is $scope.cart", $scope.cart)
				}
			}
			$scope.totalPrice = cartFactory.getTotal($scope.cart)
		})

	$scope.applyPromo = function(code, price) {
		return cartFactory.applyPromo(code, price)
			.then(function(newTotalPrice) {
				console.log("This is newTotalPrice", newTotalPrice)
				$scope.totalPrice = newTotalPrice
			})
	}

	$scope.checkOut = cartFactory.checkOut
})

//for non-logged in users, clear localStorage
//for logged in users.


//upon checkout:

//send order to back end, and mark order complete as well as save totalPrice
//then send email to user
