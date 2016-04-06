var connectbotControllers = angular.module('connectbotControllers', []);
//
// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function ($scope, $http) {



connectbotControllers.controller('MainController', ['$scope', function($scope){
  $scope.test='splash page'
  console.log('in MainController');
}]);

// app.controller('GroupIndexController', ['$scope', GroupService, function($scope){
connectbotControllers.controller('GroupIndexController', ['$scope', 'GroupService', function($scope, GroupService){
  // $scope.group_collection = "Testing group index";
  console.log('in GroupIndexController');
  GroupService.getGroups().then(function(payload) {
    console.log('payload from getGroups: ', payload.data.payload);
    $scope.groups = payload.data.payload;
  }, function(error) {
  });
}]);

connectbotControllers.controller('GroupShowController', ['$scope', '$routeParams', 'GroupService', 'MemberService', 'ActivityService', function($scope, $routeParams, GroupService, MemberService, ActivityService) {
  console.log('made it to the GroupShowController with id: ',$routeParams.id);
  $scope.groupId = $routeParams.id;
  GroupService.getGroup($scope.groupId).then(function(payload) {
    $scope.group = payload.data.payload;
    MemberService.getMember($scope.group.host_id).then(function(payload) {
      $scope.host = payload.data.payload;
      GroupService.getActivityLatest($scope.groupId).then(function(payload) {
        $scope.activity = payload.data.payload;
      })
    })
  }, function(error) {
  });
}]);

connectbotControllers.controller('ActivityShowController', ['$scope', '$routeParams', 'ActivityService', 'LocationService', 'BusinessService', function($scope, $routeParams, ActivityService, LocationService, BusinessService) {
  console.log('made it to the ActivityShowController');
  $scope.activityId = $routeParams.id;
  ActivityService.getActivity($scope.activityId).then(function(payload) {
    $scope.activity = payload.data.payload;
    console.log('activity: ', $scope.activity);
    BusinessService.getBusiness($scope.businessId).then(function(payload) {
      $scope.business = payload.data.payload;
    })
  })
}])
