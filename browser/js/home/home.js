app.config(function ($stateProvider) {
    $stateProvider.state('allItems', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeController"
    })
    .state("allItems.energy", {
      url: '/energy'
    })
});

app.controller('HomeController', function ($scope, GetAllItems) {
  GetAllItems.getItems()
    .then(function(allItems){
      $scope.items = allItems;
      $scope.featuredItems = $scope.items.slice(0,4)
      $scope.latestItems = $scope.items.slice($scope.items.length-4,$scope.items.length)
    });
    $scope.currentCategory;
});


//LETS USE THE FILTERING APPROACH
//AND ADD A RESOLVE on items
