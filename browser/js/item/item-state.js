app.config(function($stateProvider){
	$stateProvider.state('item', {
		url: '/item/:itemId',
		templateUrl: 'js/item/item-template.html',
		controller: 'itemCtrl',
		resolve: {
			itemDetails: function(itemFactory){
				console.log("successfully ran itemDetails");
				return itemFactory.getItem()
				.then(function(data){
					console.log(data);
					return data;
				})
			}
		}
	})
})