connectbotControllers.filter('timeToNormal', function(){
return function(input) {
    var splitTime   = input.split("");
    var timeFormat  = splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3];
    var newTime     = new Date("June 19, 1987 "+splitTime[0]+splitTime[1]+":"+splitTime[2]+splitTime[3]);
    return newTime;
};});
