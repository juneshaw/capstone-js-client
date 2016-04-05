
var app = angular.module('clientApp', ['ngRoute', 'connectbotControllers']);
        // app.config(function($routeProvider, $locationProvider) {
        app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/index.html',
                controller: 'MainController'
            })
            .when('/groups', {
                templateUrl: './partials/groups/index.html',
                controller: 'GroupIndexController'
            })
            .when('/groups/:id', {
                        templateUrl: 'partials/groups/show.html',
                         controller: 'GroupShowController'
            })
            .otherwise({redirectTo : '/'})

                // $locationProvider.html5Mode(true);

        })
