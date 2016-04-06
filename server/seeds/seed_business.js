
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('business').del(),

    // Inserts seed entries
    knex('business').insert({id: 1,
      name: 'Business 1',
      phone: "7204814142",
      address: "28065 Hwy 74, Evergreen, CO 80439",
      image_url_small: "",
      reservation_url: "",
      rating_img_url_small: ""}),
    knex('business').insert({id: 2,
      name: 'Business 1',
      phone: "3036700433",
      address: "28065 Hwy 74, Evergreen, CO 80439",
      image_url_small: "",
      reservation_url: "",
      rating_img_url_small: ""}),
    knex('business').insert({id: 3,
      name: 'Business 1',
      phone: "720-481-4142",
      address: "28065 Hwy 74, Evergreen, CO 80439",
      image_url_small: "",
      reservation_url: "",
      rating_img_url_small: ""}),
    knex('business').insert({id: 4,
      name: 'Business 1',
      phone: "720-481-4142",
      address: "28065 Hwy 74, Evergreen, CO 80439",
      image_url_small: "",
      reservation_url: "",
      rating_img_url_small: ""})

    );
  };
