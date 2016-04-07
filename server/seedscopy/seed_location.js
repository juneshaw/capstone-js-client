
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('location').del(),

    // Inserts seed entries
    knex('location').insert({id: 1,
      address_1: '10555 West Jewell Avenue',
      address_2: 'Apartment 1',
      city: 'Lakewood',
      state: 'CO',
      zipcode: '80232'}),
    knex('location').insert({id: 2,
      address_1: '7783 West 55th Avenue',
      address_2: 'Apartment 2',
      city: 'Arvada',
      state: 'CO',
      zipcode: '80002'}),
    knex('location').insert({id: 3,
      address_1: '6917 Timbers Drive',
      address_2: ' ',
      city: 'Evergreen',
      state: 'CO',
      zipcode: '80439'})
  );
};
