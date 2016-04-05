var app = angular.module('clientApp', ['ngRoute'])
        app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/index.html',
                controller: 'MainController'
            })
            .when('/groups', {
                templateUrl: './partials/group.html',
                controller: 'GroupListController'
            })
                .otherwise({redirectTo : '/'})
        })
