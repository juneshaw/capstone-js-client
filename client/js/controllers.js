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
  $scope.categoriesAll = CategoryService.getCategories().payload;
  $scope.preferenceId = $routeParams.id;
  $scope.periods = PreferenceService.periods;
  PreferenceService.getPreference($scope.preferenceId).then(function(payload) {
    $scope.preference = payload.data.payload;
    GroupService.getGroupFromPreference($scope.preference.id).then(function(payload) {
      $scope.group = payload.data.payload;
      PreferenceService.getPreferenceCategories($scope.preferenceId).then(function(payload) {
        $scope.categories = payload.data.payload;
        $scope.previousCategories = $scope.categories;
        console.log('$scope.categories: ', $scope.categories);
        console.log('$scope.categoriesAll', $scope.categoriesAll);
        $scope.filteredCategories = _.filter($scope.categoriesAll, function(obj){ return !_.findWhere($scope.categories, obj); });
        console.log('filteredCategories: ', $scope.filteredCategories);
      })
    });
  })

  $scope.filterCat = function() {

    //
    // var ids = {};
    // _.each(bbb, function (bb) { ids[bb.id] = true; });
    //
    // var out = _.filter(aaa, function (val) {
    //     return ids[val.id];
    // }, bbb);
    //
    var ids = {};
    _.each($scope.categories, function (bb) { ids[bb.id] == true; });

    var out = _.filter($scope.categoriesAll, function (val) {
        return ids[val.id];
    }, $scope.categories);

    return out;
    // return _.filter($scope.categoriesAll, function(a){
    //   return _.find($scope.categories, function(b){
    //       return b.id != a.id;
    //   });
    // })
  };


  // $scope.filterCat = function () {
  //   console.log('in filteredCategories');
  //   console.log('***cat all', $scope.categoriesAll);
  //   console.log('!!! cat ', $scope.categories);
  //   return $scope.categoriesAll.filter(function (category) {
  //     console.log('cat: ', category);
  //     return ($scope.categories.findIndex(category=>category.name) !=-1)
      // a.findIndex(x => x.prop2=="yutu")
      // return $scope.categories.indexOf(category.name) !== -1;
  //   });
  // };



  $scope.updatePreferenceTimes = function() {
    PreferenceService.setPreferenceTimes($scope.preference).then(function(payload) {
    })
  }

  $scope.updateCategories = function() {
    console.log('in updateCategories!!!, about to delete!   ');
  // $scope.updateCategories = function() {
    PreferenceService.deletePreferenceCategory($scope.preference.id).then(function(payload) {
      console.log('done with delete, now time for the insert with: ', $scope.categories);
      $scope.categories.forEach(function(category) {
        console.log('about to call insertPreferenceCategory', $scope.preference.id, category.id);
        PreferenceService.insertPreferenceCategory($scope.preference.id, category.id).then(function(payload) {
          console.log('finished the add');
        })
      })
    })
  }

  $scope.cancelCategoryEdit = function() {
    console.log('new $scope.categories', $scope.categories);
    $scope.categories = $scope.previousCategories;
    console.log('reverted $scope.categories', $scope.categories);
  }
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
