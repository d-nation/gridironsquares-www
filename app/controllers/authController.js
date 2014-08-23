(function(){
    "use strict";

    var AuthController = function($scope, $firebaseSimpleLogin, UserFactory) {
        var ref = new Firebase("https://gridironsquares.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(ref);

        $scope.buyerObj = {};

        $scope.$watch("auth.user", function(){
            if ($scope.auth.user) {
                UserFactory.getUserProfile($scope.auth.user.uid).$bindTo($scope, "userProfile");

                UserFactory.getUserProfile($scope.auth.user.uid).$loaded(
                    function(){

                        //Deal with a new user
                        if (!$scope.userProfile.userObj) {
                            $scope.userProfile.userObj = $scope.auth.user;
                        }

                        $scope.buyerObj = {
                            uid: $scope.auth.user.uid,
                            displayName: $scope.auth.user.displayName
                        };
                    }
                );

            } else {
                $scope.userProfile = null;
            }
        });
    };

    AuthController.$inject = ["$scope", "$firebaseSimpleLogin", "UserFactory"];

    angular.module("squaresGame").controller("AuthController", AuthController);
})();
