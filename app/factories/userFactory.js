(function () {
    "use strict";

    var UserFactory = function ($firebase) {
        var usersURL = "https://gridironsquares.firebaseio.com/users/";

        return {
            getUserProfile: function(userID) {
                var ref = new Firebase(usersURL).child(userID);

                return $firebase(ref).$asObject();
            }
        };

    };

    angular.module("squaresGame").factory("UserFactory", UserFactory);
})();