app.config(function ($stateProvider) {
    $stateProvider.state('categories', {
        url: '/categories',
        templateUrl: 'js/categories/categories.html',
        controller: 'CategoriesCtrl',
        resolve:{
            getItems: function(GetAllItems){
              return GetAllItems.getItems();
            }
        }
    })
})

app.controller('CategoriesCtrl', function ($scope, getItems){
  $scope.items = getItems
})
