var app = angular.module('clientApp', ['ngRoute', 'uiGmapgoogle-maps', 'ui.bootstrap',  angularDragula(angular), 'connectbotControllers']);
        // app.config(function($routeProvider, $locationProvider) {
        app.config(function($sceDelegateProvider) {
          $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://m.yelp.com/**'
          ]);
        })
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
            .when('/activities/:id', {
                        templateUrl: 'partials/activities/show.html',
                        controller: 'ActivityShowController'
            })
            .when('/preferences/:id', {
                        templateUrl: 'partials/preferences/show.html',
                        controller: 'PreferenceShowController'
            })
            .otherwise({redirectTo : '/'});

          })
                // $locationProvider.html5Mode(true);
