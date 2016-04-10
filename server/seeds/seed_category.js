
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('category').del(),

    // Inserts seed entries
    knex('category').insert({id: 1,
      name: 'Meals',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/restaurants.png"}),
    knex('category').insert({id: 2,
      name: 'Biking',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/biking.png"}),
    knex('category').insert({id: 3,
      name: 'Arts',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/arts.png"}),
    knex('category').insert({id: 4,
      name: 'Music',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/music.png"}),
    knex('category').insert({id: 5,
      name: 'Picnic',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/picnic.png"})
  );
};
