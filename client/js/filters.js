connectbotControllers.filter('timeToNormal', function(){
return function(input) {
  console.log('in the time filter');
    var splitTime   = input.split("");
    var timeFormat  = splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3];
    var newTime     = new Date("June 19, 1987 "+splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3]);
    return newTime;
}});

connectbotControllers.filter('rsvpYes', function () {
  return function(input) {
    return input.filter(function(element) {
      console.log('element: ', element.rsvp);
      return element.rsvp === 'Y' || element.rsvp === 'y'
    })
}});

connectbotControllers.filter('rsvpNo', function () {
  return function(input) {
    return input.filter(function(element) {
      console.log('element: ', element.rsvp);
      return element.rsvp === 'N' || element.rsvp === 'n'
    })
}});

connectbotControllers.filter('rsvpMaybe', function () {
  return function(input) {
    return input.filter(function(element) {
      console.log('element: ', element.rsvp);
      return element.rsvp === 'M' || element.rsvp === 'm'
    })
}});


connectbotControllers.filter('rsvpUnknown', function () {
  return function(input) {
    return input.filter(function(element) {
      console.log('element: ', element.rsvp);
      return element.rsvp === 'U' || element.rsvp === 'u'
    })
}});
