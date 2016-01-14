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
    });
});


//LETS USE THE FILTERING APPROACH
//AND ADD A RESOLVE on items