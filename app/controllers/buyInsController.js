(function(){
    "use strict";

    var BuyInsController = function($scope, SquaresGameFactory) {
        $scope.user = "Dustin";

        $scope.currentSqGame = SquaresGameFactory.getGame("123");

        $scope.currentSqGame.$loaded(function(){
            $scope.currentSqGame.$bindTo($scope, "currentSqGame");
            init();
        });

        $scope.onPaidChange = function(buyer){
            buyer.paidInFull = calculatePaidInFull(buyer);
        };

        $scope.getBuyIn = function(buyer){
            return buyer.squares * $scope.currentSqGame.settings.pps;
        };

        $scope.getOwed = function(buyer){
            return (buyer.squares * $scope.currentSqGame.settings.pps) - buyer.paid;
        };

        $scope.onPaidFullClick = function(buyer){
            buyer.paidInFull = true;
            buyer.paid = $scope.getBuyIn(buyer);
        };

        function calculatePaidInFull(buyer) {
            return buyer.paid === buyer.squares * $scope.currentSqGame.settings.pps;
        }

        function init() {
            var paidIn = $scope.currentSqGame.paidIn,
                i = 0;

            if (paidIn){
                for (i; i<paidIn.length; i+=1) {
                    paidIn[i].paidInFull = calculatePaidInFull(paidIn[i]);
                }
            } else {
                $scope.currentSqGame.paidIn = [];
            }
        }

    };

    BuyInsController.$inject = ["$scope", "SquaresGameFactory"];

    angular.module("squaresGame").controller("BuyInsController", BuyInsController);
})();