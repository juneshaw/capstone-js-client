var db = require('./db.js');
var utilities = require('./utilities.js');

module.exports =
{
createActivities: function() {
  // Get the groups that need to be scheduled
  var groups = this.groupsToSchedule();

  // For each of the groups, build an activity
  groups.forEach(function(group) {
    console.log('this group needs to be scheduled', group);
  })

},

groupsToSchedule: function () {
  // Groups to schedule next
  var groups = [];
  // Lead time needed to build activity from the today to that day
  var leadDays = 20;

  // Get today's date to see what activities need to be built.
  var dateToday = new Date();
  console.log('Today is: ', dateToday);

  // Get the Groups
  db.Groups().then(function(data) {
    console.log('data: ****', data);

    // For each group, calculate the number of days left until the next activity date.
    data.forEach(function(group) {
      console.log('group date: ', group.next_activity_date);
      var dayDiff = utilities.dayDiff(dateToday, group.next_activity_date);
      console.log('***** dayDiff: ', dayDiff);

      // If the activity is within the lead time, put the group in the array to schedule
      if (dayDiff <= leadDays)
        groups.push(group);
    })
    console.log('groups to schedule: ', groups);
  })
  return groups;
},

};
