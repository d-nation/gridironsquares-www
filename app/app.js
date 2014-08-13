(function() {
    "use strict";

    var squaresGame = angular.module("squaresGame", ["ngRoute", "firebase"]);

    squaresGame.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "SquaresGameController",
                templateUrl: "app/views/main.html"/*,
                resolve: {
                    // controller will not be invoked until getCurrentUser resolves
                    "currentUser": ["simpleLogin", function(simpleLogin) {
                        // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
                        // since $getCurrentUser returns a promise resolved when auth is initialized,
                        // we can simple return that here to ensure the controller waits for auth before
                        // loading
                        return simpleLogin.$getCurrentUser();
                    }]
                }*/
            })
            .when("/settings", {
                controller: "SettingsController",
                templateUrl: "app/views/settings.html"
            })
            .when("/buyins", {
                controller: "BuyInsController",
                templateUrl: "app/views/buyins.html"
            })
            .when("/winnings", {
                controller: "WinningsController",
                templateUrl: "app/views/winnings.html"
            })
            .otherwise(
            {
                redirectTo: "/"
            }
        );
    });

})();