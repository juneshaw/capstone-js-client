
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('group').del(),

    // Inserts seed entries
    knex('group').insert({id: 1,
      title: 'CSU Buddies',
      host_id: 1,
      bio: "Friends from CSU.  This group originated from dorm suitemates and extended friends.  We went on spring break trips, went to away athletic functions, hung out together.  We reunite during CSU football season, but are trying to get together occasionally during the rest of the year.",
      image_url: 'images/friends_dusk',
      preference_id: 1}),
    knex('group').insert({id: 2,
      title: 'Galvanize Cohort',
      host_id: 1,
      bio: "Galvanize Full Stack G18 Cohort.  We went through 6 months of intense web developer curriculum together.  Now that we are off to our own adventures, we want to keep the group together",
      image_url: 'images/friends_street',
      preference_id: 2}),
    knex('group').insert({id: 3,
      title: 'Cousins in Denver',
      host_id: 1,
      bio: "These are cousins from the Murphy side of my family.  There are 6 of us that live in the Denver metro area.  Family reunions stopped a while back, but we want to catch up every now and then!",
      image_url: 'images/friends_river',
      preference_id: 3})
  );
};
