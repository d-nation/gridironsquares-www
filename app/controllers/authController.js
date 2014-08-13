(function(){
    "use strict";

    var AuthController = function($scope, $firebaseSimpleLogin) {
        var ref = new Firebase("https://gridironsquares.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(ref);
        $scope.clicked = function(){console.log("login")}
    };

    AuthController.$inject = ["$scope", "$firebaseSimpleLogin"];

    angular.module("squaresGame").controller("AuthController", AuthController);
})();
