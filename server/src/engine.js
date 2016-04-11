
module.exports =
{
createActivity: function (groupId, locationCenter, preference) {
  // Get the Groups
  db.Groups().then(function(data) {
    res.send({payload:data});
    // Check if the next activity date is less than 2 weeks away.
    // if ()
  })
  console.log('groupId, locationCenter, preference', groupId, locationCenter, preference);
},

};
