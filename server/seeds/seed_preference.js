
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('preference').del(),

    // Inserts seed entries
    knex('preference').insert({id: 1,
      day: "Friday",
      periodicity: "weekly",
      time: "19:00:00",
      custom_location_id: 0,
      custom_category_flag: 'false',
      location_id: 1,
      search_term: "",
      sort: 0,
      radius_filter: 40000}),
    knex('preference').insert({id: 2,
      day: "Saturday",
      periodicity: "monthly",
      time: "18:00:00",
      custom_location_id: 0,
      custom_category_flag: false,
      location_id: 2,
      search_term: '',
      sort: 1,
      radius_filter: 20000}),
    knex('preference').insert({id: 3,
      day: "Sunday",
      periodicity: "monthly",
      time: "18:30:00",
      custom_location_id: 0,
      custom_category_flag: false,
      location_id: 1,
      search_term: '',
      sort: 2,
      radius_filter: 40000}),
    knex('preference').insert({id: 4,
      day: "Friday",
      periodicity: "weekly",
      time: "12:00:00",
      custom_location_id: 0,
      custom_category_flag: true,
      location_id: 2,
      search_term: '',
      sort: 0,
      radius_filter: 40000})
  );
};
