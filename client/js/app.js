
var app = angular.module('clientApp', ['ngRoute', 'connectbotControllers']);
        app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/index.html',
                controller: 'MainController'
            })
            .when('/groups', {
                templateUrl: './partials/groups.html',
                controller: 'GroupIndexController'
            })
                .otherwise({redirectTo : '/'})
        })
