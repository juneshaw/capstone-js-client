// var angular = require('angular');
// var angularDragula = require('angular-dragula');

var connectbotControllers = angular.module('connectbotControllers', []);
//
// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//   function ($scope, $http) {



connectbotControllers.controller('MainController', ['$scope', function($scope){
  // app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  //     $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://localhost:9011/**']);
  //      }]);
}]);

// app.controller('GroupIndexController', ['$scope', GroupService, function($scope){
connectbotControllers.controller('GroupIndexController', ['$scope', 'GroupService', 'ActivityService', function($scope, GroupService, ActivityService){
  // $scope.group_collection = "Testing group index";
  GroupService.getGroups().then(function(payload) {
    $scope.groups = payload.data.payload;
    $scope.groups.forEach(function(group, index) {
      GroupService.getActivityLatest(group.id).then(function(payload) {
        console.log('getActivityLatest: ', payload);
        $scope.groups[index].activity=payload.data.payload;
        // RsvpService.getReply()
      })

    })
  }, function(error) {
  });
}]);

connectbotControllers.controller('GroupShowController', ['$scope', '$routeParams', 'GroupService', 'MemberService', 'ActivityService', function($scope, $routeParams, GroupService, MemberService, ActivityService) {
  $scope.groupId = $routeParams.id;
  console.log('groupid: ', $scope.groupId);
  GroupService.getGroup($scope.groupId).then(function(payload) {
    $scope.group = payload.data.payload;
    GroupService.getMembers($scope.groupId).then(function(payload) {
      $scope.members = payload.data.payload;
      console.log('members in controller', $scope.members);
      MemberService.getMember($scope.group.host_id).then(function(payload) {
        $scope.host = payload.data.payload;
        GroupService.getActivityLatest($scope.groupId).then(function(payload) {
          $scope.activity = payload.data.payload;
        })
      })
    })
  })
}]);

connectbotControllers.controller('GroupActgenController', ['$scope', '$routeParams', 'GroupService', 'MemberService', 'ActivityService', 'RsvpService', function($scope, $routeParams, GroupService, MemberService, ActivityService, RsvpService) {
  console.log('got to actgen controller');
  GroupService.actgen().then(function(payload) {
    $scope.group = payload;
    console.log('payload from actgen: ', payload);
  })
  // GroupService.getGroup($scope.groupId).then(function(payload) {
  //   $scope.group = payload.data.payload;
  //   MemberService.getMember($scope.group.host_id).then(function(payload) {
  //     $scope.host = payload.data.payload;
  //     GroupService.getActivityLatest($scope.groupId).then(function(payload) {
  //       $scope.activity = payload.data.payload;
  //     })
  //   })
  // }, function(error) {
  // });
}]);

connectbotControllers.controller('ActivityShowController', ['$scope', '$routeParams', '$animate', 'ActivityService', 'LocationService', 'BusinessService', 'MemberService', 'RsvpService', 'GroupService', function($scope, $routeParams, $animate, ActivityService, LocationService, BusinessService, MemberService, RsvpService, GroupService) {
  // app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  //   console.log('doing the sce ******');
  //   $sceDelegateProvider.resourceUrlWhitelist([
  //     // Allow same origin resource loads.
  //     'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
  //     'http://m.yelp.com/**'
  //   ]);
  // })
  $scope.activityId = $routeParams.id;
  ActivityService.getActivity($scope.activityId).then(function(payload) {
    console.log('activity???', payload);
    console.log('activity!!!: ', payload);
    $scope.activity = payload.data.payload;
    // BusinessService.getBusiness($scope.activity.business_id).then(function(payload) {
    //   $scope.business = payload.data.payload;
    //   console.log('$scope.business: ', $scope.business);
      $scope.map = {
        center: {
                latitude: $scope.activity.lat,
                longitude: $scope.activity.long
        },
        zoom: 11,
        markers: [{
          id: Date.now(),
          coords: {
            latitude: $scope.activity.lat,
            longitude: $scope.activity.long          }
        }]};
        // $scope.map.markers.push(marker);

        ActivityService.getMembers($scope.activityId).then(function(payload) {
          $scope.members = payload.data.payload;
          GroupService.getGroupByActivity($scope.activity.id).then(function(payload) {
            $scope.group = payload.data.payload;
            console.log('group is: ', $scope.group);
          })
        // })
      });
    })

    $scope.reply = function(response, memberId, activityId) {
      RsvpService.reply(response, memberId, activityId);
    }
}]);

connectbotControllers.controller('PreferenceShowController', ['$scope', '$routeParams', '$animate', 'GroupService', 'LocationService', 'MemberService', 'PreferenceService', 'CategoryService', 'CategoryData', function($scope, $routeParams, $animate, GroupService, LocationService, MemberService, PreferenceService, CategoryService, CategoryData) {
  $scope.categoriesAll = CategoryService.getCategories().payload;
  $scope.preferenceId = $routeParams.id;
  $scope.periods = PreferenceService.periods;
  PreferenceService.getPreference($scope.preferenceId).then(function(payload) {
    $scope.preference = payload.data.payload;
    GroupService.getGroupFromPreference($scope.preferenceId).then(function(payload) {
      $scope.group = payload.data.payload;
      PreferenceService.getPreferenceCategories($scope.preferenceId).then(function(payload) {
        $scope.categories = payload.data.payload;
        // $scope.previousCategories = $scope.categories;
        $scope.filteredCategories = _.filter($scope.categoriesAll, function(obj){ return !_.findWhere($scope.categories, obj); });
      })
    });
  })

  $scope.updatePreferenceTimes = function() {
    PreferenceService.setPreferenceTimes($scope.preference).then(function(payload) {
    })
  }

  $scope.updateCategories = function() {
    PreferenceService.deletePreferenceCategories($scope.preference.id).then(function(payload) {
      $scope.categories.forEach(function(category) {
        PreferenceService.insertPreferenceCategory($scope.preference.id, category.id).then(function(payload) {
          console.log('finished the add');
        });
      });
    });
  };

  // $scope.cancelCategoryEdit = function() {
  //   console.log('new $scope.categories', $scope.categories);
  //   $scope.categories = $scope.previousCategories;
  //   console.log('reverted $scope.categories', $scope.categories);
  // }
  //
  // $scope.currentPreferenceCategory = function(category) {
  //   return($scope.categories.indexOf(category));
  // };

    // filter logic here...
    // return false if item already added, true otherwise
// };
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
