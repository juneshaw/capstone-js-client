
exports.up = function(knex, Promise) {
  return knex.schema.createTable('business', function(table){
    table.increments('id');
    table.string('name');
    table.string('phone');
    table.string('address');
    table.string('image_url_small')
    table.string('reservation_url');
    table.string('rating_img_url_small');
    table.string('snippet_text');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('business');
};
