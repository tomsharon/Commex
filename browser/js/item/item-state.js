app.config(function($stateProvider){
	$stateProvider.state('item', {
		url: '/item/:itemId',
		templateUrl: '/item-template.html',
		controller: 'itemCtrl',
		resolve: {
			itemDetails: function(itemFactory){
				return itemFactory.getItem()
				.then(function(data){
					return data;
				})
			}
		}
	})
})