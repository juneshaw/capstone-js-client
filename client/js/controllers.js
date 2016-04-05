var connectbotControllers = angular.module('connectbotControllers', []);
//
// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function ($scope, $http) {


connectbotControllers.controller('MainController', ['$scope', function($scope){
  $scope.test='splash page'
}]);

// app.controller('GroupIndexController', ['$scope', GroupService, function($scope){
connectbotControllers.controller('GroupIndexController', ['$scope', 'GroupService', function($scope, GroupService){
  $scope.group_collection = "Testing group index";
  GroupService.getGroups().then(function(payload) {
    console.log('payload from getGroups: ', payload);
    $scope.group_collection = payload;
  }, function(error) {
  });
}]);
