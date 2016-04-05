app.controller('MainController', ['$scope', function($scope){
  $scope.test='HTML and Routes Working'
}]);

app.controller('GroupIndexController', ['$scope', GroupService, function($scope){
  GroupService.getGroups().then(function(payload) {
    $scope.group_collection = payload.data;
  }, function(error) {
  });
}]);
