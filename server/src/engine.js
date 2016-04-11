var db = require('./db.js');

module.exports =
{
createActivity: function () {
  // Get the Groups
  db.Groups().then(function(data) {
    console.log('data: ****', data);
    data.forEach(function(group) {
      console.log('group date: ', group.next_activity_date);
      // res.send(group.date);
    })
    console.log({payload:data.payload});
  })
  // console.log('groupId, locationCenter, preference', groupId, locationCenter, preference);
},

};
