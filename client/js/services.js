app.service("GroupService", function($http){
  var GroupService = {};

  GroupService.getGroups = function(){
    // return $http.get("http://localhost:3000/groups", {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/groups", {method: "jsonp"});
  }

  GroupService.getGroup = function(id){
    // return $http.get("http://localhost:3000/groups/"+id, {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/groups/"+id, {method: "jsonp"});
  }

  GroupService.getActivityLatest = function(id) {
    console.log('made it to getActivityLatest');
    return $http.get("http://capstone-js.herokuapp.com/groups/"+id+"/activities", {method: "jsonp"});
  }

  GroupService.getGroupFromPreference = function(preferenceId) {
    return $http.get("http://capstone-js.herokuapp.com/groups/preference/"+preferenceId, {method: "jsonp"});
  }

  return GroupService;
});

app.service("MemberService", function($http){
  var MemberService = {};

  MemberService.getMembers = function(){
    // return $http.get("http://localhost:3000/groups", {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/members", {method: "jsonp"});
  }
  MemberService.getMember = function(id) {
    return $http.get("http://capstone-js.herokuapp.com/members/"+id, {method: "jsonp"});
  }
  return MemberService;
});


app.service("ActivityService", function($http) {
  var ActivityService = {};

  ActivityService.getActivity = function(activityId) {
    console.log('made it to getActivity with id of ', activityId);
    return $http.get("http://capstone-js.herokuapp.com/activities/"+activityId, {method: "jsonp"});
  }

  ActivityService.getMembers = function(activityId) {
    return $http.get("http://capstone-js.herokuapp.com/activities/"+activityId+"/members", {method: "jsonp"});
  }
  return ActivityService;
})

app.service("LocationService", function($http) {
  var LocationService = {};

  LocationService.getLocation = function(locationId) {
    console.log('made it to getLocation');
    return $http.get("http://capstone-js.herokuapp.com/locations/"+locationId, {method: "jsonp"});
  }
  return LocationService;
})

app.service("BusinessService", function($http) {
  var BusinessService = {};

  BusinessService.getBusiness = function(businessId) {
    console.log('made it to getBusiness');
    return $http.get("http://capstone-js.herokuapp.com/businesses/"+businessId, {method: "jsonp"});
  }
  return BusinessService;
})

app.service("PreferenceService", function($http) {
  var PreferenceService = {};

  PreferenceService.getPreference = function(preferenceId) {
    console.log('made it to getPreference');
    return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId, {method: "jsonp"});
  }

  PreferenceService.setPreferenceTimes = function(preference) {
    console.log('preference in setPreferenceTimes', preference);
    console.log('!!! ', preference.time);
    var data = $.param({
        json: JSON.stringify({
              "time": preference.time,
              "day": preference.day,
              "periodicity": preference.periodicity}),

    });
    url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";

    return $http({
    method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}


    PreferenceService.getPreferenceCategories = function(preferenceId) {
    console.log('made it to getPreference');
    return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories", {method: "jsonp"});
  }

  PreferenceService.setPreferenceCategories = function(preference) {
    console.log('preference in setPreferenceCategories', preference);
    var data = $.param({
        json: JSON.stringify({
              "category_id": preference.category_id}),
    });
    url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";

    return $http({
    method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }


    // console.log('data in set times: ', data);
    // return $http.post("http://capstone-js.herokuapp.com/groups/preference/"+preference.id+"/edit",data);
  // }

  // PreferenceService.getGroup = function(preferenceId) {
  //   return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/group", {method: "jsonp"});
  // }

  PreferenceService.periods =
    {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    periods: ["weekly", "biweekly", "monthly"]};

  //
  // Preference.getPeriods = function() {
  //   return(
  //   {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   periods: ["weekly", "biweekly", "monthly"]});
  // }
  return PreferenceService;
})

app.service('CategoryService', function($http) {
    var categories = null;
    console.log('in categoryservice');
    var promise = $http.get('http://capstone-js.herokuapp.com/categories').success(function (data, err) {
      console.log('data for categories', data);
      categories = data;
    });

    return {
      promise:promise,
      getCategories: function() {
        console.log('in getCategories with categories: ', categories);
        return categories;
      }
    };
});


// app.service("CategoryService", function($http) {
//   var CategoryService = {};
  //
  // CategoryService.getCategory = function(preferenceId) {
  //   console.log('made it to getCategory');
  //   return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId, {method: "jsonp"});
  // }

//   CategoryService.setCategoryTimes = function(preference) {
//     console.log('preference in setCategoryTimes', preference);
//     console.log('!!! ', preference.time);
//     var data = $.param({
//         json: JSON.stringify({
//               "time": preference.time,
//               "day": preference.day,
//               "periodicity": preference.periodicity}),
//     //     var data = $.param({
//     // json: JSON.stringify({
//     //     name: $scope.newName
//     // })
// // });
  //   });
  //   url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";
  //
  //   return $http({
  //   method: 'POST',
  //   url: url,
  //   data: data,
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  // })

  // CategoryService.setCategoryCategories = function(preference) {
  //   console.log('preference in setCategoryCategories', preference);
  //   var data = $.param({
  //       json: JSON.stringify({
  //             "category_id": preference.category_id}),
  //   });
  //   url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";
  //
  //   return $http({
  //   method: 'POST',
  //   url: url,
  //   data: data,
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  // })


    // console.log('data in set times: ', data);
    // return $http.post("http://capstone-js.herokuapp.com/groups/preference/"+preference.id+"/edit",data);
  // }

  // CategoryService.getGroup = function(preferenceId) {
  //   return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/group", {method: "jsonp"});
  // }
  //
  // CategoryService.categories =
  //   {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   periods: ["weekly", "biweekly", "monthly"]};

  //
  // Category.getPeriods = function() {
  //   return(
  //   {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   periods: ["weekly", "biweekly", "monthly"]});
  // }
//   return CategoryService;
// })
