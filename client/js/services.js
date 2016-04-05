app.service("GroupService", function($http){
  var GroupService = {};

  GroupService.getGroups = function(){
    return $http.get("http://localhost:3000/groups", {method: "jsponp"});
    // return $http.get("https://frozen-badlands-34577.herokuapp.com/cats", {method: "jsonp"});
  }

  // CatService.getCat = function(cat_id){
  //   return $http.get("http://localhost:3000/cats/"+cat_id);
  //   // return $http.get("https://frozen-badlands-34577.herokuapp.com/cats/"+cat_id, {method: "jsonp"});
  // }
  //
  // CatService.addCat = function(catObject) {
  //   return $http.post("http://localhost:3000/cats/", catObject);
  // }

  return GroupService;
});
