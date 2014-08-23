(function () {
    "use strict";

    var SquaresGameFactory = function($firebase, $routeParams) {
        var ref, sync, syncObj, id,
            game = {},
            defaultGame = {
                "owner": "google:100139053569908199597",
                "settings": {
                    pps: 5,
                    winningPercent: [25,25,25,25],
                    isRandomized: false
                },
                "paidIn": [],
                "paidOut": [],
                "columns": [
                    {"column": "0", "scoreDigit": "?"},
                    {"column": "1", "scoreDigit": "?"},
                    {"column": "2", "scoreDigit": "?"},
                    {"column": "3", "scoreDigit": "?"},
                    {"column": "4", "scoreDigit": "?"},
                    {"column": "5", "scoreDigit": "?"},
                    {"column": "6", "scoreDigit": "?"},
                    {"column": "7", "scoreDigit": "?"},
                    {"column": "8", "scoreDigit": "?"},
                    {"column": "9", "scoreDigit": "?"}
                ],

                "rows": [
                    {
                        pos: 0,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 1,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 2,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 3,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 4,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 5,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 6,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 7,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 8,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    },
                    {
                        pos: 9,
                        "scoreDigit": "?",
                        columns: [
                            {"column": "0", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "1", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "2", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "3", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "4", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "5", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "6", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "7", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "8", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]},
                            {"column": "9", "owner": "", "scoreDigit": "?", winningQuarters: [false, false, false, false]}
                        ]
                    }
                ]
            },
            gamesURL = "https://gridironsquares.firebaseio.com/game/";
        
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
        }
        
        function guid() {
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
                 s4() + "-" + s4() + s4() + s4();
        }

        return {
            getColumns: function(gameId) {
                var ref = new Firebase(gamesURL).child(gameId);

                return $firebase(ref.child("column")).$asArray();
            },
            getSettings: function(gameId){
                var ref = new Firebase(gamesURL).child(gameId);

                return $firebase(ref.child("settings")).$asObject();
            },
            getPaidIn: function(gameId){
                var ref = new Firebase(gamesURL).child(gameId);

                return $firebase(ref.child("paidIn")).$asObject();
            },
            getGame: function(){
                var ref = new Firebase(gamesURL).child($routeParams.gameID);

                return $firebase(ref).$asObject();
            },
            getGameByID: function(gameID){
                var ref = new Firebase(gamesURL).child(gameID);

                return $firebase(ref).$asObject();
            },
            "resetGame": function() {
                game = angular.copy(defaultGame);
            },
            "getDefault": function() {
                return angular.copy(defaultGame);
            },
            "getGameID": function(){
                return $routeParams.gameID;
            }
        };
    };
    SquaresGameFactory.$inject = ["$firebase", "$routeParams"];

    angular.module("squaresGame").factory("SquaresGameFactory", SquaresGameFactory);
})();