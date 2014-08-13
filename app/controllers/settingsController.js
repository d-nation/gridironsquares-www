(function(){
    "use strict";

    var SettingsController = function($scope, SquaresGameFactory) {
        $scope.currentSqGame = {};


        $scope.currentSqGame.settings = SquaresGameFactory.getSettings("123");
        $scope.currentSqGame.settings.$loaded(function(){
            SquaresGameFactory.getSettings("123").$bindTo($scope, "currentSqGame.settings");
        });

        $scope.user = "Dustin";

        $scope.footballGame = {
            "away": {
                "name": "Seattle Seahawks",
                "quarterScores": [10, 20, 30, 40]
            },
            "home": {
                "name": "Washington Redskins",
                "quarterScores": [11, 21, 31, 41]
            }
        };

//        $scope.currentSqGame = SquaresGameFactory.getGame();

        $scope.invalidWinningPercent = false;

        $scope.calcTotalPercent = function(){
            var winningPercents = $scope.currentSqGame.settings.winningPercent,
                i,
                total = 0;
            for (i=0; i<winningPercents.length; i++) {
                total = total + winningPercents[i];
            }

            $scope.invalidWinningPercent = total !== 100;
        };

        $scope.randomizeGrid = function(){
            var columns = $scope.currentSqGame.columns,
                newColumnDigits = shuffleArray(["0", "2", "4", "6", "8", "9", "7", "5", "3", "1"]),
                rows = $scope.currentSqGame.rows,
                newRowDigits = shuffleArray(["9", "7", "5", "3", "1", "0", "2", "4", "6", "8"]),
                i, j;

            $scope.currentSqGame.settings.isRandomized = true;

            for (i=0; i<columns.length;i+=1) {
                columns[i].scoreDigit = newColumnDigits[i];
            }

            for (i=0; i<rows.length;i+=1) {
                rows[i].scoreDigit = newRowDigits[i];

                for (j=0; j<columns.length;j+=1) {
                    rows[i].columns[j].scoreDigit = newColumnDigits[j];
                }
            }
        };

        $scope.resetGame = function(){
            SquaresGameFactory.resetGame();
            $scope.currentSqGame = SquaresGameFactory.getGame();
        };

        function shuffleArray(array) {
            var i, j, temp;

            for (i = array.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }


    };

    SettingsController.$inject = ["$scope", "SquaresGameFactory"];

    angular.module("squaresGame").controller("SettingsController", SettingsController);
})();
