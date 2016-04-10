// var angular = require('angular');
// var angularDragula = require('angular-dragula');

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

connectbotControllers.controller('ActivityShowController', ['$scope', '$routeParams', '$animate', 'ActivityService', 'LocationService', 'BusinessService', 'MemberService', function($scope, $routeParams, $animate, ActivityService, LocationService, BusinessService, MemberService) {
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
        zoom: 8,
        markers: [{
          id: Date.now(),
          coords: {
              latitude: $scope.business.lat,
              longitude: $scope.business.long
          }
        }]};
        // $scope.map.markers.push(marker);

        ActivityService.getMembers($scope.activityId).then(function(payload) {
          console.log('member payload for activity id: ',$scope.activityId, ' ', payload.data.payload);
          $scope.members = payload.data.payload;
        })
      });
    })
}]);


// app.controller('MainCtrl', function($scope,MyService) {
//   console.log('Promise is now resolved: '+MyService.doStuff().data)
//   $scope.data = MyService.doStuff();
// });

connectbotControllers.controller('PreferenceShowController', ['$scope', '$routeParams', '$animate', 'GroupService', 'LocationService', 'MemberService', 'PreferenceService', 'CategoryService', 'CategoryData', function($scope, $routeParams, $animate, GroupService, LocationService, MemberService, PreferenceService, CategoryService, CategoryData) {
  $scope.categories = CategoryService.getCategories();
  console.log('categories!!!!', $scope.categories);
  console.log('made it to the PreferenceShowController');
  $scope.preferenceId = $routeParams.id;
  $scope.periods = PreferenceService.periods;
  console.log('periods', $scope.periods);
  PreferenceService.getPreference($scope.preferenceId).then(function(payload) {
    $scope.preference = payload.data.payload;
    console.log('preference = ', $scope.preference);
    GroupService.getGroupFromPreference($scope.preference.id).then(function(payload) {
      $scope.group = payload.data.payload;
      console.log('group for preference: ', $scope.group);
    });
  })

  $scope.updateTimes = function() {
    console.log('made it to updateTimes');
    PreferenceService.setPreferenceTimes($scope.preference).then(function(payload) {
      console.log('payload is: ', payload);
    })
  }
// }]);

  $scope.today = function() {
  $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
}])
// connectbotControllers.controller('PreferenceShowController', ['$scope', '$routeParams', '$animate', 'GroupService', 'LocationService', 'MemberService', 'PreferenceService', function($scope, $routeParams, $animate, GroupService, LocationService, MemberService, PreferenceService) {

connectbotControllers.controller('BusinessModalController', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      // templateUrl: 'myModalContent.html',
      templateUrl: $scope.business.mobile_url,
      controller: 'ModalInstanceController',
      placement: 'top',
      windowClass: 'app-modal-window',
      // size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

connectbotControllers.controller('ModalInstanceController', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
  console.log('made it to the ModalInstanceController');

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close();
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('CategoryController', ['$scope', function ($scope) {
  $scope.$on('category.drag', function (e, el) {
    el.removeClass('ex-moved');
  });

  $scope.$on('category.drop', function (e, el) {
    el.addClass('ex-moved');
  });

  $scope.$on('category.over', function (e, el, container) {
    container.addClass('ex-over');
  });

  $scope.$on('category.out', function (e, el, container) {
    container.removeClass('ex-over');
  });
}]);
// connectbotControllers.controller('CategoryController', ['$scope', '$element', 'dragularService', function ($scope, $element, dragularService) {
//   dragularService.cleanEnviroment();
//   dragularService('.containerVertical');
// }]);

// connectbotControllers.controller(angularDragula(angular)]);
