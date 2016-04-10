
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('preference_category').del(),

    // Inserts seed entries
    knex('preference_category').insert(
      {id: 1,
      preference_id: 1,
      category_id: 1}),
    knex('preference_category').insert(
      {id: 2,
      preference_id: 1,
      category_id: 2}),
    knex('preference_category').insert(
      {id: 3,
      preference_id: 1,
      category_id: 3})
  );
};
