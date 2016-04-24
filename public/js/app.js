// var angular = require('angular');
// var angularDragula = require('angular-dragula');
//
// var app = angular.module('my-app', [angularDragula(angular)]);

var app = angular.module('clientApp', ['ngRoute', 'uiGmapgoogle-maps', 'ui.bootstrap',  'connectbotControllers', 'auth0', 'angular-storage', 'angular-jwt', angularDragula(angular), 'auth0', 'angular-storage', 'angular-jwt' ]);

// app.js
// angular.module('YOUR-APP-NAME', ['auth0', 'angular-storage', 'angular-jwt'])
        app.config(function (authProvider) {
          authProvider.init({
            domain: 'juneshaw.auth0.com',
            clientID: 'ePaUUAMbYwRxaWmp876xOblLO9v2th8z',
            // callbackURL: location.href,
            // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
            loginUrl: '/login'
          });

          //app.js
          authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log("Login Success");
            profilePromise.then(function(profile) {
              store.set('profile', profile);
              store.set('token', idToken);
            });
            $location.path('/');
          });

          authProvider.on('loginFailure', function() {
            // Error Callback
          });
        })


        app.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
          // ...

          // We're annotating this function so that the `store` is injected correctly when this file is minified
          jwtInterceptorProvider.tokenGetter = ['store', function(store) {
            // Return the saved token
            return store.get('token');
          }];

          $httpProvider.interceptors.push('jwtInterceptor');
          // ...
        });


        app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/index.html',
                controller: 'MainController'
            })
            .when('/login', {
              templateUrl: 'partials/login/login.html',
              controller: 'LoginController'
            })
            // Logged in route
            .when('/user-info', {
              templateUrl: 'userinfo.html',
              controller: 'UserInfoController',
              requiresLogin: true
            })
            .when('/groups', {
                templateUrl: './partials/groups/index.html',
                controller: 'GroupIndexController'
            })
            .when('/groups/actgen', {
              templateUrl: 'partials/groups/actgen.html',
              controller: 'GroupActgenController'
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
                        controller: 'PreferenceShowController',
                        resolve:{
                          'CategoryData':function(CategoryService){
                            // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
                            return CategoryService.promise;
                          }
                        }
            })
            .otherwise({redirectTo : '/'});

          })

          app.run(function($rootScope, auth, store, jwtHelper, $location) {
            // This events gets triggered on refresh or URL change
            $rootScope.$on('$locationChangeStart', function() {
              var token = store.get('token');
              if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                  if (!auth.isAuthenticated) {
                    auth.authenticate(store.get('profile'), token);
                  }
                } else {
                  // Either show the login page or use the refresh token to get a new idToken
                  $location.path('/');
                }
              }
            });
          });

          app.run(function(auth) {
            // This hooks al auth events to check everything as soon as the app starts
            auth.hookEvents();
          });


                // $locationProvider.html5Mode(true);
