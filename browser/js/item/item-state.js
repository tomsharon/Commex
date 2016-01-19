app.config(function($stateProvider){
	$stateProvider.state('item', {
		url: '/categories/:categoryName/:itemId',
		templateUrl: 'js/item/item-template.html',
		controller: 'itemCtrl',
		resolve: {
			itemDetails: function(itemFactory, $stateParams){
				return itemFactory.getItem($stateParams.categoryName, $stateParams.itemId)
				.then(function(data){
					return data.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			},
			reviews: function(itemFactory, $stateParams){
				return itemFactory.getReviews($stateParams.itemId)
				.then(function(review){
					return review.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			}
		}
	})
})
