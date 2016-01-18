app.controller('itemCtrl', function($scope, AuthService, itemDetails, reviews, itemFactory, $stateParams, $state){
	$scope.item = itemDetails;
	$scope.reviews = reviews;
	$scope.addToCart = itemFactory.addToCart;
	$scope.isLoggedIn = false

	AuthService.getLoggedInUser()
	.then(function(user){
		if(!user._id){
			$scope.isLoggedIn = false
		}else{
			$scope.isLoggedIn = true
		}
		return user;
	})

	$scope.submitReview = function(review){
		review.reviewDate = Date.now()
		review.reviewProduct = $stateParams.itemId
		itemFactory.addReview(review)
		.then(function(review){
			$state.reload();
		})
		.then(null, function(err){
				console.log(err)
				if(err.status === 401){
					$state.go('login')
				}
		})
	}
})
