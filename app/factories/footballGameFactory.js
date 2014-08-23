(function () {
    "use strict";

    var FootballGameFactory = function ($firebase) {
        var ref, sync, syncObj,
        gamesURL = "https://gridironsquares.firebaseio.com/footballGames/";

        return {
            getGame: function(league, gameID){
                var ref = new Firebase(gamesURL + "nfl/2014/1/").child(gameID);

                return $firebase(ref).$asObject();
            },
            getLeagues: function(){
                var ref = new Firebase(gamesURL).child("leagues");

                return $firebase(ref).$asObject();
            },
            getGames: function(league, week){
                var ref = new Firebase(gamesURL + "/" + league + "/2014/" + week + "/");

                return $firebase(ref).$asObject();
            }
        };

    };

    angular.module("squaresGame").factory("FootballGameFactory", FootballGameFactory);
})();