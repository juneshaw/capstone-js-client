
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('member').del(),
    knex('group').del(),
    knex('preference').del(),
    knex('category').del(),
    knex('activity').del(),
    knex('contact_info').del(),
    knex('location').del(),
    knex('comment').del(),
    knex('activity_member').del(),
    knex('group_member').del(),
    knex('preference_category').del(),
    knex('custom_category').del(),
    knex('business').del()
  )};
