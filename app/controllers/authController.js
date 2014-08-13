(function(){
    "use strict";

    var AuthController = function($scope, $firebaseSimpleLogin) {
        var ref = new Firebase("https://gridironsquares.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(ref);
    };

    AuthController.$inject = ["$scope", "$firebaseSimpleLogin"];

    angular.module("squaresGame").controller("AuthController", AuthController);
})();
