var connectbotControllers = angular.module('connectbotControllers', []);
//
// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function ($scope, $http) {


connectbotControllers.controller('MainController', ['$scope', function($scope){
  $scope.test='splash page'
}]);

// app.controller('GroupIndexController', ['$scope', GroupService, function($scope){
// app.controller('GroupIndexController', ['$scope', function($scope){
  // GroupService.getGroups().then(function(payload) {
  //   $scope.group_collection = payload.data;
//     $scope.group_collection = "Testing group index";
//   }, function(error) {
//   });
// }]);
