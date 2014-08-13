(function(){
    "use strict";

    var WinningsController = function($scope, SquaresGameFactory) {
        $scope.user = "Dustin";

        $scope.currentSqGame = SquaresGameFactory.getGame("123");
//        SquaresGameFactory.getGame("123").$bindTo($scope, "currentSqGame");

        $scope.currentSqGame.$loaded(function(){
            $scope.currentSqGame.$bindTo($scope, "currentSqGame");
            init();
        });

        $scope.onPaidWinningsClick = function(quarter){
            quarter.paid = !quarter.paid;
        };

        function calculateWinnings(winner) {
            return $scope.currentSqGame.settings.winningPercent[winner.quarter - 1] * $scope.currentSqGame.settings.pps;
        }

        function init() {
            var paidOut = $scope.currentSqGame.paidOut,
                i = 0;

            if (paidOut) {
                for (i; i < paidOut.length; i += 1) {
                    paidOut[i].winnings = calculateWinnings(paidOut[i]);
                }
            } else {
                $scope.currentSqGame.paidOut = [];
            }
        }

    };

    WinningsController.$inject = ["$scope", "SquaresGameFactory"];

    angular.module("squaresGame").controller("WinningsController", WinningsController);
})();