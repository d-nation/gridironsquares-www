(function () {
    "use strict";

    var FootballGameFactory = function ($firebase) {
        var ref, sync, syncObj,
        gamesURL = "https://gridironsquares.firebaseio.com/footballGames/nfl/2014/1/";

        return {
            getGame: function(league, gameID){
                var ref = new Firebase(gamesURL).child(gameID);

                return $firebase(ref).$asObject();
            }
        };

    };

    angular.module("squaresGame").factory("FootballGameFactory", FootballGameFactory);
})();