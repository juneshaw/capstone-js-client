
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('group_member').del(),

    // Inserts seed entries
    knex('group_member').insert({id: 1,
      group_id: 1,
      member_id: 1}),
    knex('group_member').insert({id: 2,
      group_id: 1,
      member_id: 2}),
    knex('group_member').insert({id: 3,
      group_id: 1,
      member_id: 3})
  );
};
