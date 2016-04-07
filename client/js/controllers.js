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

connectbotControllers.controller('ActivityShowController', ['$scope', '$routeParams', '$window', 'ActivityService', 'LocationService', 'BusinessService', function($scope, $routeParams, $window, ActivityService, LocationService, BusinessService) {
  console.log('made it to the ActivityShowController');
  $scope.activityId = $routeParams.id;
  ActivityService.getActivity($scope.activityId).then(function(payload) {
    $scope.activity = payload.data.payload;
    BusinessService.getBusiness($scope.activity.business_id).then(function(payload) {
      console.log('business data: ', payload.data.payload);
      $scope.business = payload.data.payload;
      $scope.map = {
        center: {
                latitude: $scope.business.lat,
                longitude: $scope.business.long
        },
        zoom: 8
      };
      // var web_key = "AIzaSyA34gNqYa9dpD_u4MCmrWUTi-zbQlSw0yA"; // put in grunt config

      // var google_api = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"

      // var my_key = '&key=' + "AIzaSyA34gNqYa9dpD_u4MCmrWUTi-zbQlSw0yA"


      // request(google_api+my_key, function (error, response, body) {
      //   if (!error && response.statusCode == 200) {
      //     var jase = JSON.parse(body);
          // var lat_long = jase["results"][0]["geometry"]["location"];


//           var lat_long = jase.results[0].geometry.location;
//           console.log(lat_long);
//           res.render('index', { title: 'Express', lat_long: lat_long});
//          }
//        })
//
//       $window.map = new google.maps.Map(document.getElementById('map'), {
//     center: {
//         lat: -34.397,
//         lng: 150.644
//     },
//     zoom: 8
// });
    })
  })
}])
