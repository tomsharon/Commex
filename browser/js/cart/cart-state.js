app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: 'js/cart/cart-template.html',
		controller: 'cartCtrl'
	})
})
