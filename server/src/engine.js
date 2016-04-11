var db = require('./db.js');
var utilities = require('./utilities.js');

module.exports =
{
createActivity: function () {
  // Get today's date to see what activities need to be built.
  var dateToday = new Date();
  console.log('Today is: ', dateToday);

  // Get the Groups
  db.Groups().then(function(data) {
    console.log('data: ****', data);

    // For each group, calculate the number of days left until the next activity date.
    data.forEach(function(group) {
      console.log('group date: ', group.next_activity_date);
      var dayDiff = utilities.dayDiff2(dateToday, group.next_activity_date);
      console.log('***** dayDiff: ', dayDiff);
      // console.log('!!!!! difference with subtraction: ', group.next_activity_date-date);
      // res.send(group.date);
    })
  })
  return;
},

};
