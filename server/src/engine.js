var db = require('./db.js');

module.exports =
{
createActivity: function () {
  // Get today's date to see what activities need to be built.
  var date = new Date();
  console.log('Today is: ', date);

  // Get the Groups
  db.Groups().then(function(data) {
    console.log('data: ****', data);
    data.forEach(function(group) {
      console.log('group date: ', group.next_activity_date);
      dayDiff()
      // res.send(group.date);
    })
  })
  return;
},

};
