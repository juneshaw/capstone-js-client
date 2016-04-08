connectbotControllers.filter('timeToNormal', function(){
return function(input) {
  if (!input || !input.length) { return; }
    var splitTime   = input.split("");
    var timeFormat  = splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3];
    var newTime     = new Date("June 19, 1987 "+splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3]);
    return newTime;
}});

connectbotControllers.filter('rsvpYes', function () {
  return function(input) {
    if (!input || !input.length) { return; }
    return input.filter(function(element) {
      return element.rsvp === 'Y' || element.rsvp === 'y'
    })
}});

connectbotControllers.filter('rsvpNo', function () {
  return function(input) {
    if (!input || !input.length) { return; }
    return input.filter(function(element) {
      return element.rsvp === 'N' || element.rsvp === 'n'
    })
}});

connectbotControllers.filter('rsvpMaybe', function () {
  return function(input) {
    if (!input || !input.length) { return; }
    return input.filter(function(element) {
      return element.rsvp === 'M' || element.rsvp === 'm'
    })
}});


connectbotControllers.filter('rsvpUnknown', function () {
  return function(input) {
    if (!input || !input.length) { return; }
    return input.filter(function(element) {
      return element.rsvp === 'U' || element.rsvp === 'u'
    })
}});
