
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('activity_member').del(),

    // Inserts seed entries
    knex('activity_member').insert({id: 1,
      activity_id:2,
      member_id:1,
      rsvp: 'Y'}),
    knex('activity_member').insert({id: 2,
      activity_id:2,
      member_id:2,
      rsvp: 'N'}),
    knex('activity_member').insert({id: 3,
      activity_id:2,
      member_id:3,
      rsvp: 'N'}),
    knex('activity_member').insert({id: 4,
      activity_id:2,
      member_id:4,
      rsvp: 'Y'}),
    knex('activity_member').insert({id: 5,
      activity_id:2,
      member_id:5,
      rsvp: 'M'}),
    knex('activity_member').insert({id: 6,
      activity_id:2,
      member_id:6,
      rsvp: 'U'}),
    knex('activity_member').insert({id: 7,
      activity_id:2,
      member_id:7,
      rsvp: 'U'}),
    knex('activity_member').insert({id: 8,
      activity_id:2,
      member_id:8,
      rsvp: 'U'}),
    knex('activity_member').insert({id: 9,
      activity_id:2,
      member_id:9,
      rsvp: 'U'})
  );
};
