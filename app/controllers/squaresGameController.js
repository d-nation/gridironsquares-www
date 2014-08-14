(function(){
    "use strict";

    var SquaresGameController = function($scope, SquaresGameFactory, FootballGameFactory) {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
        }

        function guid() {
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
                 s4() + "-" + s4() + s4() + s4();
        }

        $scope.templates = [
            {name: "squares", url: "app/views/squares.html"},
            {name: "settings", url: "app/views/settings.html"},
            {name: "buyins", url: "app/views/buyins.html"},
            {name: "winnings", url: "app/views/winnings.html"}
        ];

        $scope.template = $scope.templates[0];

        $scope.setTemplate = function(templateName){
            var i;

            for (i=0;i<$scope.templates.length; i+=1){
                if ($scope.templates[i].name === templateName) {
                    $scope.template = $scope.templates[i];
                }
            }
        };

        SquaresGameFactory.getGame("123").$bindTo($scope, "currentSqGame");

        SquaresGameFactory.getGame("123").$loaded(function(){
            $scope.isOwner = $scope.auth.user.uid === $scope.currentSqGame.owner;
            FootballGameFactory.getGame("nfl", "167234").$bindTo($scope, "footballGame");

            buyInInit();
            winningsInit();
            $scope.$watch("currentSqGame.settings.pps", buyInInit);
            $scope.$watch("currentSqGame.settings", winningsInit);
            $scope.$watch("footballGame.quarter", findWinningSquare);
        });

        $scope.resetGame = function(){
            $scope.currentSqGame = angular.copy(angular.extend(SquaresGameFactory.getDefault(), {$id: $scope.currentSqGame.$id}));
        };

        $scope.visibleSections = {
            settings: false,
            buyIns: false,
            winnings: false
        };

        $scope.showSection = function(section){
            for( var key in $scope.visibleSections) {
                if ($scope.visibleSections.hasOwnProperty(key)){
                    $scope.visibleSections[key] = key === section;
                }
            }
        };

        $scope.buySquare = function(){
            var i,
                buyers = $scope.currentSqGame.paidIn,
                currentBuyer = false;

            //If the paid in array is there
            if (!!buyers) {

                //Find the current user in the paidIn buyers list
                for (i=0; i<buyers.length; i+=1){

                    console.log(buyers[i].buyer.uid)
                    //if this is not their first square purchase
                    if (buyers[i].buyer.uid === $scope.buyerObj.uid) {
                        buyers[i].squares += 1;
                        currentBuyer = true;
                    }
                }

                //if this is their first square purchase
                if (!buyers || !currentBuyer) {
                    buyers.push({
                        "buyer": $scope.buyerObj,
                        "squares": 1,
                        "paid": 0,
                        "paidInFull": false
                    });
                }
            }

            //If the paid in array isn't there
            if (!buyers) {
                $scope.currentSqGame.paidIn= [{
                    "buyer": $scope.buyerObj,
                    "squares": 1,
                    "paid": 0,
                    "paidInFull": false
                }];
            }
        };

        function findWinningSquare(){
            var quarter = 0,
                homeScore = 0,
                awayScore = 0,
                rows, cols,
                row, col;

            if ($scope.footballGame){
                quarter = $scope.footballGame.quarter - 1;

                if (quarter>0){
                    homeScore = $scope.footballGame.teams.home.quarterScores[quarter-1].toString();
                    homeScore = homeScore.substr(homeScore.length - 1);

                    awayScore = $scope.footballGame.teams.away.quarterScores[quarter-1].toString();
                    awayScore = awayScore.substr(awayScore.length - 1);

                    rows = $scope.currentSqGame.rows;
                    for (row = 0; row < rows.length; row +=1) {
                        if (rows[row].scoreDigit === homeScore) {

                            cols = rows[row].columns;
                            for (col = 0; col < cols.length; col +=1) {
                                if (cols[col].scoreDigit === awayScore) {
                                    cols[col].winningQuarters[quarter-1] = true;

                                    if (!$scope.currentSqGame.paidOut) {
                                        $scope.currentSqGame.paidOut = [{
                                            quarter: quarter,
                                            owner: cols[col].owner,
                                            cell: [row, col],
                                            paid: false,
                                            winnings: 0
                                        }];
                                    } else {
                                        if ($scope.currentSqGame.paidOut.length < quarter){
                                            $scope.currentSqGame.paidOut.push({
                                                quarter: quarter,
                                                owner: cols[col].owner,
                                                cell: [row, col],
                                                paid: false,
                                                winnings: 0
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // *********** SETTINGS FUNCTIONS ***************
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

        // ************* BUYINS FUNCTIONS ********************
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

        function buyInInit() {
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

        // ************** WINNINGS FUNCTIONS *******************
        $scope.onPaidWinningsClick = function(quarter){
            quarter.paid = !quarter.paid;
        };

        function calculateWinnings(winner) {
            return $scope.currentSqGame.settings.winningPercent[winner.quarter - 1] * $scope.currentSqGame.settings.pps;
        }

        function winningsInit() {
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

    SquaresGameController.$inject = ["$scope", "SquaresGameFactory", "FootballGameFactory"];

    angular.module("squaresGame").controller("SquaresGameController", SquaresGameController);
})();
