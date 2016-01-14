app.factory('GetAllItems', function ($http) {
    return {
      getItems: function(){
        return $http.get('/api/categories')
          .then(function(response){
            return response.data;
          });
        },
        getItemByCategory: function(categoryName){
          return $http.get('/api/categories/' + categoryName)
            .then(function(response){
              return response.data;
            })
        }
    };
});
