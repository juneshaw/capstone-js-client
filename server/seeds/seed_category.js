
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('category').del(),

    // Inserts seed entries
    knex('category').insert({id: 1,
      name: 'Meals',
      url: ""}),
    knex('category').insert({id: 2,
      address_1: '7783 West 55th Avenue',
      address_2: 'Apartment 2',
      city: 'Arvada',
      state: 'CO',
      zipcode: '80002'}),
    knex('category').insert({id: 3,
      address_1: '6917 Timbers Drive',
      address_2: ' ',
      city: 'Evergreen',
      state: 'CO',
      zipcode: '80439'})
  );
};
