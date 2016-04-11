
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('category').del(),

    // Inserts seed entries
    knex('category').insert({id: 1,
      name: 'restaurants',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/restaurants.png"}),
    knex('category').insert({id: 2,
      name: 'hiking',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/biking.png"}),
    knex('category').insert({id: 3,
      name: 'arts',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/arts.png"}),
    knex('category').insert({id: 4,
      name: 'musicvenues',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/music.png"}),
    knex('category').insert({id: 5,
      name: 'gardens',
      image_url: "https://s3-us-west-1.amazonaws.com/connectbot/picnic.png"})
  );
};
