// Provides the center of the members' locations.
// Google map can show on the page that shows profiles.
// Each group member must have lat/long or zip or address, etc.
// May or may not show the maps for each of their locations.
// This will have to be run dynamically when the app is
// picking a location center to send to Yelp.
// TO BE WRITTEN
var bound = new google.maps.LatLngBounds();

for (i = 0; i < locations.length; i++) {
  bound.extend( new google.maps.LatLng(locations[i][2], locations[i][3]) );

  // OTHER CODE
}

console.log( bound.getCenter() );
