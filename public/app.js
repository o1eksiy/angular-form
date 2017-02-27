var app = angular.module('form-example', [])
    .controller('ExampleController', ['$scope', function($scope) {
    $scope.list = [];
    $scope.text = 'hello';
    $scope.submit = function() {
        alert('form was successfully sent!');
    };
}]);

app.directive('username', function($q, $timeout) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.username = function(modelValue, viewValue) {
                if(modelValue && modelValue.split(' ').length == 2) {
                    return $q.resolve();
                }
                else {
                    return $q.reject()
                }
            };
        }
    };
});