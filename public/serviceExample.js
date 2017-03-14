var myModule = angular.module('myModule', []);
myModule.controller('MyController', ['$scope', 'cow', function($scope, cow) {
    $scope.cowSays = function() {
        cow.makeVoice();
    }
}]);
myModule.factory('cow', ['$timeout', function($timeout) {
    return {
        say: function() {
            alert ('Moooo!');
        },
        makeVoice: function() {
            $timeout(this.say, 000);
        }
    };
}]);