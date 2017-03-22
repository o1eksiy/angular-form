var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "tmp/main.htm"
        })
        .when("/form", {
            templateUrl: "tmp/form.html"
        })
        .when("/service", {
            templateUrl: "tmp/service.htm"
        })
        .when("/data", {
            templateUrl: "tmp/data.htm",
            controller: 'RouteController',
        });
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});
app.controller('RouteController', function($scope, $routeParams, $http) {
    $http.get("/json/test.json")
        .then(function(response) {
            $scope.json = response.data;
        });
})
app.controller('ExampleController', ['$scope', function ($scope) {
        $scope.submit = function () {
            alert('form was successfully sent!');
        };
        $scope.expression = function (item) {
            // var id = item.attributes['data-clicked'].value;
            console.log($scope.attributes);
        };
        $scope.doStuff = function (item) {
            console.log(item.attributes['data-id'].value);
            item.attributes['data-id'].value += 1;
        };
    }]);

app.directive('username', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.username = function (modelValue, viewValue) {
                if (modelValue && modelValue.split(' ').length == 2) {
                    return $q.resolve();
                }
                else {
                    return $q.reject()
                }
            };
        }
    };
});
app.directive('popup', function () {
    return {
        restrict: 'E',
        templateUrl: '/tmp/dialog.html'
    };
});
app.directive("modalShow", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            //Hide or show the modal
            scope.showModal = function (visible, elem) {

                if (!elem)
                    elem = element;

                if (visible)
                    $(elem).modal("show");
                else
                    $(elem).modal("hide");
            };

            //Watch for changes to the modal-visible attribute
            scope.$watch(attrs.modalShow, function (newValue, oldValue) {
                scope.showModal(newValue, attrs.$$element);
            });

            //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
            $(element).bind("hide.bs.modal", function () {
                $parse(attrs.modalShow).assign(scope, false);
                if (!scope.$$phase && !scope.$root.$$phase)
                    scope.$apply();
            });
        }
    };
});

app.controller('MyController', ['$scope', 'cow', function($scope, cow) {
    $scope.cowSays = function() {
        cow.makeVoice();
    }
}]);
app.factory('cow', ['$timeout', function($timeout) {
    return {
        say: function() {
            alert ('Moooo!');
        },
        makeVoice: function() {
            $timeout(this.say, 1000);
        }
    };
}]);