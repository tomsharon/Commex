app.controller('cartCtrl', function($scope, $state, cartFactory, localStorageService, AuthService, $http){
	
	AuthService.getLoggedInUser()
		.then(function(loggedInUser) {
			$scope.user = loggedInUser
			console.log("this is user", $scope.user)
		})

	$scope.nonLoggedInUser = {};	


	$scope.orderId;

	$scope.cart = []
	$scope.itemQuantities = {};
	$scope.updateCart = function(itemId, newQuantity) {
		console.log("ah, so you want " + newQuantity + " of the item with id " + itemId + " after all");
		var updatedCart = $scope.cart;
		updatedCart.forEach(function(item){
			if(item.item._id === itemId){
				item.quantity = newQuantity;
				return;
			}
		})
		console.log("after cart");
		console.log(updatedCart);
		if($scope.orderId){
		//if the user is logged in and therefore an order document exists
			$http.put("api/orders/" + $scope.orderId, {items: updatedCart})
			.then(function(response){
				console.log(response);
			})
		}
		else{
		//otherwise, only have to update localStorage quantity
			localStorageService.set("orders", updatedCart);
		}
	}
	cartFactory.getCart()
		.then(function(cart) {
			var quantities = localStorageService.get("quantityArray")
			for(var i = 0; i < cart.length; i++) {
				$scope.cart.push({item: cart[i], quantity: quantities[i]})
				console.log("This is $scope.cart", $scope.cart)

		.then(function(order) {
			console.log("cartFactory.getCart() was invoked!")
			if(!order){
				console.log("not doing anything with order, as it is null")
				//there is no logged in user and the unauthenticated user has no items
				return;
			}
			$scope.orderId = order._id;
			var quantities = localStorageService.get("quantityArray");
			if(quantities){
				console.log("there's stuff on local storage, we'll user that for cart")
				for(var i = 0; i < order.length; i++){
					$scope.itemQuantities[order[i]._id] = quantities[i];
					$scope.cart.push({item: order[i], quantity: quantities[i]});
				}
				console.log("actual before cart")
				console.log($scope.cart)
			}
			else{
				console.log("gonna grab those items we got from the request, since a user is logged in")
				for(var i = 0; i < order.items.length; i++){
					$scope.itemQuantities[order.items[i].item._id] = order.items[i].quantity;
					console.log(order.items[i]);
					console.log("adding quantity " + order.items[i].quantity + " for key " + order.items[i].item._id);
					$scope.cart.push(order.items[i]);
				}
				console.log($scope.itemQuantities);

			}
			console.log("cart is");
			console.log($scope.cart);
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