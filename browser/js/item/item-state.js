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
			}
		}
	})
})
