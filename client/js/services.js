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
    return $http.get("http://capstone-js.herokuapp.com/locations/"+businessId, {method: "jsonp"});
  }
  return BusinessService;
})
