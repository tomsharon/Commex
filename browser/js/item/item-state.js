app.config(function($stateProvider){
	$stateProvider.state('item', {
		url: '/item/:itemId',
		templateUrl: 'js/item/item-template.html',
		controller: 'itemCtrl',
		resolve: {
			itemDetails: function(itemFactory, $stateParams){
				console.log("successfully ran itemDetails");
				console.log(itemFactory.getItem());
				return itemFactory.getItem($stateParams.itemId)
				.then(function(data){
					console.log(data.data);
					return data.data;
				})
				.catch(null, function(error){
					console.log(error);
				})
			}
		}
	})
})