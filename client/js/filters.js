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
    console.log('in the rsvp function with input: ', input);
    return input.rsvp === 'Y' || input.rsvp === 'y';
}});

connectbotControllers.filter('rsvpNo', function () {
  return function(input) {
    console.log('in the rsvp function with input: ', input);
    return input.rsvp === 'N' || input.rsvp === 'n';
}});

connectbotControllers.filter('rsvpMaybe', function () {
  return function(input) {
    console.log('in the rsvp function with input: ', input);
    return input.rsvp === 'M' || input.rsvp === 'm';
}});


connectbotControllers.filter('rsvpUnknown', function () {
  return function(input) {
    console.log('in the rsvp function with input: ', input);
    return input.rsvp === 'U' || input.rsvp === 'u' || input.rsvp === '';
}});
