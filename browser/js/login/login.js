app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, localStorageService, $http) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            return AuthService.getLoggedInUser();
        })
        .then(function(user){
            return $http.get("/api/orders?user=" + user._id + "&status=Incomplete");
        })
        .then(function(userOrder){
            console.log(userOrder);
            var orderId = userOrder.data[0]._id;
            var userCart = userOrder.data[0].items;
            var anonCart = localStorageService.get('orders');
            if (userCart && anonCart){
                userCart.forEach(function(item){
                    for(var i = 0; i < anonCart.length; i++){
                        var match = item.item;
                        if(match === anonCart[i].item || match === anonCart[i].item._id){
                            item.quantity += anonCart[i].quantity;
                            anonCart[i].quantity = 0;
                        }
                    }
                })
                anonCart.forEach(function(item){
                    if(item.quantity !== 0) {
                        if(item.item._id){
                            item.item = item.item._id;
                        }
                        userCart.push(item);
                    }
                });
            }
            else if(anonCart){
                anonCart.forEach(function(item){
                    if(item.item._id){
                        item.item = item.item._id;
                    }
                })
                userCart = anonCart;
            }
            console.log("order id is");
            console.log(orderId);
            return $http.put("api/orders/" + orderId, { items: userCart })
        })
        .then(function(){
            $state.go('allItems');
        })
        .catch(function (error) {
            console.log(error);
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo).then(function () {
            $state.go('allItems');
        }).catch(function () {
            $scope.error = 'This email already exists.';
        });

    };
});
