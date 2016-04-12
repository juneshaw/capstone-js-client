app.service("GroupService", function($http){
  var GroupService = {};

  GroupService.getGroups = function(){
    // return $http.get("https://localhost:3000/groups", {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/groups", {method: "jsonp"});
  }

  GroupService.getGroup = function(id){
    // return $http.get("https://localhost:3000/groups/"+id, {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/groups/"+id, {method: "jsonp"});
  }

  GroupService.getActivityLatest = function(id) {
    return $http.get("https://capstone-js.herokuapp.com/groups/"+id+"/activities", {method: "jsonp"});
  }

  GroupService.getGroupFromPreference = function(preferenceId) {
    return $http.get("https://capstone-js.herokuapp.com/groups/preference/"+preferenceId, {method: "jsonp"});
  }

  GroupService.getLocationCenter = function(groupId) {
    return $http.get("https://capstone-js.herokuapp.com/groups/location/"+locationId, {method: "jsonp"}).then(function(data){
    })
  }

  GroupService.actgen = function() {
    return $http.get("https://capstone-js.herokuapp.com/groups/actgen", {method: "jsonp"});
  }

    // Convert lat/lon (must be in radians) to Cartesian coordinates for each location.
    // var X = cos(lat) * cos(lon)
    // var Y = cos(lat) * sin(lon)
    // var Z = sin(lat)

    // Compute average x, y and z coordinates.
    // var x = (x1 + x2 + ... + xn) / n
    // var y = (y1 + y2 + ... + yn) / n
    // var z = (z1 + z2 + ... + zn) / n

    // Convert average x, y, z coordinate to latitude and longitude.
    // var Lon = atan2(y, x)
    // var Hyp = sqrt(x * x + y * y)
    // var Lat = atan2(z, hyp)
  // }
  return GroupService;
});

app.service("MemberService", function($http){
  var MemberService = {};

  MemberService.getMembers = function(){
    // return $http.get("https://localhost:3000/groups", {method: "jsponp"});
    return $http.get("https://capstone-js.herokuapp.com/members", {method: "jsonp"});
  }
  MemberService.getMember = function(id) {
    return $http.get("https://capstone-js.herokuapp.com/members/"+id, {method: "jsonp"});
  }
  return MemberService;
});


app.service("ActivityService", function($http) {
  var ActivityService = {};

  ActivityService.getActivity = function(activityId) {
    return $http.get("https://capstone-js.herokuapp.com/activities/"+activityId, {method: "jsonp"});
  }

  ActivityService.getMembers = function(activityId) {
    return $http.get("https://capstone-js.herokuapp.com/activities/"+activityId+"/members", {method: "jsonp"});
  }

  ActivityService.createActivity = function() {

  }
  return ActivityService;
})

app.service("LocationService", function($http) {
  var LocationService = {};

  LocationService.getLocation = function(locationId) {
    return $http.get("https://capstone-js.herokuapp.com/locations/"+locationId, {method: "jsonp"});
  }

  return LocationService;
})

app.service("BusinessService", function($http) {
  var BusinessService = {};

  BusinessService.getBusiness = function(businessId) {
    return $http.get("https://capstone-js.herokuapp.com/businesses/"+businessId, {method: "jsonp"});
  }
  return BusinessService;
})

app.service("PreferenceService", function($http) {
  var PreferenceService = {};

  PreferenceService.getPreference = function(preferenceId) {
    return $http.get("https://capstone-js.herokuapp.com/preferences/"+preferenceId, {method: "jsonp"});
  }

  PreferenceService.setPreferenceTimes = function(preference) {
    var data = $.param({
        json: JSON.stringify({
              "time": preference.time,
              "day": preference.day,
              "periodicity": preference.periodicity}),

    });
    // url = "https://capstone-js.herokuapp.com/preferences/"+preference.id+"/edit";
    url = "https://capstone-js.herokuapp.com/preferences/"+preference.id+"/times/edit";

    return $http({
    method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}


  PreferenceService.getPreferenceCategories = function(preferenceId) {
    return $http.get("https://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories", {method: "jsonp"});
  }

  PreferenceService.deletePreferenceCategories = function(preferenceId) {
    return $http.get("https://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories/delete", {method: "jsonp"});
  }

  PreferenceService.insertPreferenceCategory = function(preferenceId, categoryId) {
    var data = $.param({
        json: JSON.stringify({
              "preference_id": preferenceId,
              "category_id": categoryId}),
    });

    url = "https://capstone-js.herokuapp.com/preferences/"+preferenceId+"/categories/insert";

    return $http({
    method: 'POST',
    url: url,
    data: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }


    // console.log('data in set times: ', data);
    // return $http.post("https://capstone-js.herokuapp.com/groups/preference/"+preference.id+"/edit",data);
  // }

  // PreferenceService.getGroup = function(preferenceId) {
  //   return $http.get("https://capstone-js.herokuapp.com/preferences/"+preferenceId+"/group", {method: "jsonp"});
  // }

  PreferenceService.periods =
    {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    periods: ["weekly", "biweekly", "monthly"]};


  return PreferenceService;
})

app.service('CategoryService', function($http) {
    var categories = null;
    var promise = $http.get('https://capstone-js.herokuapp.com/categories').success(function (data, err) {
      categories = data;
    });

    return {
      promise:promise,
      getCategories: function() {
        return categories;
      }
    };
});
