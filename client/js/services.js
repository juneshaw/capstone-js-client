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
    return $http.get("http://capstone-js.herokuapp.com/activities/"+activityId, {method: "jsonp"});
  }

  ActivityService.getMembers = function(activityId) {
    return $http.get("http://capstone-js.herokuapp.com/activities/"+activityId+"/members", {method: "jsonp"});
  }

  ActivityService.createActivity = function() {

  }
  return ActivityService;
})

app.service("LocationService", function($http) {
  var LocationService = {};

  LocationService.getLocation = function(locationId) {
    return $http.get("http://capstone-js.herokuapp.com/locations/"+locationId, {method: "jsonp"});
  }

  GroupService.getCenter = function(groupId) {
    $http.get("http://capstone-js.herokuapp.com/locations/"+locationId, {method: "jsonp"}).then(function(data){
      console.log('group center', data);
    })

    // Convert lat/lon (must be in radians) to Cartesian coordinates for each location.
    var X = cos(lat) * cos(lon)
    var Y = cos(lat) * sin(lon)
    var Z = sin(lat)

    // Compute average x, y and z coordinates.
    var x = (x1 + x2 + ... + xn) / n
    var y = (y1 + y2 + ... + yn) / n
    var z = (z1 + z2 + ... + zn) / n

    // Convert average x, y, z coordinate to latitude and longitude.
    var Lon = atan2(y, x)
    var Hyp = sqrt(x * x + y * y)
    var Lat = atan2(z, hyp)
  }
  return LocationService;
})

app.service("BusinessService", function($http) {
  var BusinessService = {};

  BusinessService.getBusiness = function(businessId) {
    return $http.get("http://capstone-js.herokuapp.com/businesses/"+businessId, {method: "jsonp"});
  }
  return BusinessService;
})

app.service("PreferenceService", function($http) {
  var PreferenceService = {};

  PreferenceService.getPreference = function(preferenceId) {
    return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId, {method: "jsonp"});
  }

  PreferenceService.setPreferenceTimes = function(preference) {
    var data = $.param({
        json: JSON.stringify({
              "time": preference.time,
              "day": preference.day,
              "periodicity": preference.periodicity}),

    });
    // url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";
    url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/times/edit";

    return $http({
    method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}


  PreferenceService.getPreferenceCategories = function(preferenceId) {
    return $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories", {method: "jsonp"});
  }

  PreferenceService.deletePreferenceCategories = function(preferenceId) {
    console.log('in preferenceService deletePrefCat:', preferenceId);
    return      $http.get("http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories/delete", {method: "jsonp"});
  //   var data = {};
  //   // var data = $.param({
  //   //     json: JSON.stringify({
  //   //           "category_id": preference.category_id}),
  //   // });
  //   url = "http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories/delete";
  //   // url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/times/edit";
  //   // url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";
  //
  //   return $http({
  //   method: 'GET',
  //   url: url,
  //   // data: data,
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   })
  }

  PreferenceService.insertPreferenceCategory = function(preferenceId, categoryId) {
    console.log('in insertPreferenceCategory with p/c of ', preferenceId, categoryId);
    var data = $.param({
        json: JSON.stringify({
              "preference_id": preferenceId,
              "category_id": categoryId}),
    });
    url = "http://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories/insert";
    // url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/times/edit";
    // url = "http://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";

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


  return PreferenceService;
})

app.service('CategoryService', function($http) {
    var categories = null;
    var promise = $http.get('http://capstone-js.herokuapp.com/categories').success(function (data, err) {
      categories = data;
    });

    return {
      promise:promise,
      getCategories: function() {
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
