
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('member').del(),

    // Inserts seed entries
    knex('member').insert({id: 1,
      first_name: 'June',
      last_name: 'Shaw',
      contact_info_id: 1}),
    knex('member').insert({id: 2,
      first_name: 'Bob',
      last_name: 'Gauen',
      contact_info_id: 2}),
    knex('member').insert({id: 3,
      first_name: 'Dee',
      last_name: 'Metzger',
      contact_info_id: 3})
  );
};
