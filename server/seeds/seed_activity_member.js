
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('activity_member').del(),

    // Inserts seed entries
    knex('activity_member').insert({id: 1,
      activity_id:2,
      member_id:1}),
    knex('activity_member').insert({id: 2,
      activity_id:2,
      member_id:2}),
    knex('activity_member').insert({id: 3,
      activity_id:2,
      member_id:3}),
    knex('activity_member').insert({id: 4,
      activity_id:2,
      member_id:4}),
    knex('activity_member').insert({id: 5,
      activity_id:2,
      member_id:5})
  );
};
